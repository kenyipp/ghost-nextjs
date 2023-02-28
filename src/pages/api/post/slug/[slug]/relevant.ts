import { knex } from "@ghost/knex";
import type { NextApiRequest, NextApiResponse } from "next";
import { type PostOrPage } from "@tryghost/content-api";
import { type RelevantPostResponse } from "@ghost/types";
import { getPosts } from "@ghost/utils/getPosts";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<RelevantPostResponse>
) {
	const slug = req.query.slug as string;

	if (req.method !== "GET") {
		return res.status(405).json({ data: null } as any);
	}

	const tag = await knex
		.first<Tag>({
			id: "tags.id",
			name: "name",
			slug: "slug"
		})
		.from("posts_tags")
		.innerJoin("tags", "tags.id", "posts_tags.tag_id")
		.where(
			"post_id",
			knex
				.first("id")
				.from("posts")
				.where("slug", slug)
				.where("type", "post")
				.where("status", "published")
		)
		.where("sort_order", 0);

	let relevant: PostOrPage[] = [];
	let relevantCount = 0;
	let latest: PostOrPage[] = [];

	if (tag) {
		const query = knex
			.from("posts")
			.whereNot("slug", slug)
			.where("type", "post")
			.where("status", "published")
			.whereIn(
				"id",
				knex.select("post_id").from("posts_tags").where("tag_id", tag.id)
			);

		const [ids, count] = await Promise.all([
			query
				.clone()
				.select<Post[]>("id")
				.limit(3)
				.then((rows) => rows.map((post) => post.id)),
			query
				.first({ count: knex.raw("COUNT(*)") })
				.clone()
				.then((response) => response?.count)
		]);

		if (ids.length > 0) {
			relevant = await getPosts({ ids })
				.then((posts) => posts.sort((a, b) => ids.indexOf(b.id) - ids.indexOf(a.id)));
			relevantCount = count;
		}
	}

	const notInSlug: string[] = [slug, ...relevant.map((post) => post.slug)];

	latest = await knex
		.select("id")
		.from("posts")
		.whereNot("type", "page")
		.where("status", "published")
		.whereNotIn("slug", notInSlug)
		.limit(3)
		.orderBy("created_at", "desc")
		.then(async (rows) => {
			const ids = rows.map((item) => item.id);
			const posts = await getPosts({ ids });
			return posts.sort((a, b) => ids.indexOf(b.id) - ids.indexOf(a.id));
		});

	return res.json({
		data: {
			tag,
			relevant,
			relevantCount,
			latest
		}
	});
}

interface Tag {
	id: string,
	name: string,
	slug: string
}

interface Post {
	id: string,
}

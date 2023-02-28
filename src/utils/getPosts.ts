import { knex } from "@ghost/knex";
import { utils } from "@tryghost/helpers";
import { type PostOrPage, Author, Tag } from "@tryghost/content-api";

export const getPost = async ({ id }: { id: string }): Promise<PostOrPage> => {
	const post = await getPosts({ ids: [id] }).then((posts) => posts[0]);
	return post;
};

export const getPosts = async ({ ids }: { ids: string[] }): Promise<PostOrPage[]> => {
	if (ids.length < 1) {
		return [];
	}
	const [
		posts,
		taxonomies,
		id2authors,
		id2tags
	] = await Promise.all([
		knex
			.select<PostOrPage[]>({
				slug: "posts.slug",
				id: "posts.id",
				uuid: "posts.uuid",
				title: "posts.title",
				html: "posts.html",
				comment_id: "posts.comment_id",
				feature_image: "posts.feature_image",
				featured: "posts.featured",
				visibility: "posts.visibility",
				created_at: "posts.created_at",
				updated_at: "posts.updated_at",
				published_at: "posts.published_at",
				custom_excerpt: "posts.custom_excerpt",
				codeinjection_head: "posts.codeinjection_head",
				codeinjection_foot: "posts.codeinjection_foot",
				custom_template: "posts.custom_template",
				canonical_url: "posts.canonical_url",
				excerpt: "posts.custom_excerpt",
				og_image: "posts_meta.og_image",
				og_title: "posts_meta.og_title",
				og_description: "posts_meta.og_description",
				twitter_image: "posts_meta.twitter_image",
				twitter_title: "posts_meta.twitter_title",
				twitter_description: "posts_meta.twitter_description",
				meta_title: "posts_meta.meta_title",
				meta_description: "posts_meta.meta_description",
				email_subject: "posts_meta.email_subject",
				frontmatter: "posts_meta.frontmatter",
				feature_image_alt: "posts_meta.feature_image_alt",
				feature_image_caption: "posts_meta.feature_image_caption"
			})
			.from("posts")
			.leftJoin("posts_meta", "posts.id", "posts_meta.post_id")
			.whereIn("posts.id", ids)
			.then((items) => items.map((post) => {
				post.featured = Boolean(post.featured);
				if (!post.custom_excerpt && post.plaintext) {
					post.excerpt = post.plaintext.substring(0, 500) + (post.plaintext.length > 500 ? "..." : "");
				}
				post.reading_time = post.html ? utils.readingMinutes(post.html) : 0;
				return post;
			})),
		knex
			.select<Taxonomy[]>({
				type: knex.raw("'tag'") as any,
				post_id: "post_id",
				taxonomy_id: "tag_id",
				sort_order: "sort_order"
			})
			.from("posts_tags")
			.union(
				knex
					.select({
						type: knex.raw("'author'"),
						post_id: "post_id",
						taxonomy_id: "author_id",
						sort_order: "sort_order"
					})
					.from("posts_authors")
			),
		knex
			.select<Author[]>([
				"id",
				"name",
				"slug",
				"profile_image",
				"cover_image",
				"bio",
				"website",
				"location",
				"facebook",
				"twitter",
				"meta_title",
				"meta_description"
			])
			.from("users")
			.whereIn("id", knex.select("author_id").from("posts_authors").whereIn("post_id", ids))
			.then((users) => Object.fromEntries(users.map((user) => [user.id, user]))),
		knex
			.select<Tag[]>([
				"id",
				"name",
				"slug",
				"description",
				"feature_image",
				"visibility",
				"og_image",
				"og_title",
				"og_description",
				"twitter_image",
				"twitter_title",
				"twitter_description",
				"meta_title",
				"meta_description",
				"codeinjection_head",
				"codeinjection_foot",
				"canonical_url",
				"accent_color"
			])
			.from("tags")
			.whereIn("id", knex.select("tag_id").from("posts_tags").whereIn("post_id", ids))
			.then((tags) => Object.fromEntries(tags.map((tag) => [tag.id, tag])))
	]);

	return posts.map((post) => {
		post.tags = taxonomies
			.filter((item) => item.post_id === post.id && item.type === "tag")
			.sort((a, b) => b.sort_order - a.sort_order)
			.map((item) => id2tags[item.taxonomy_id]);
		[post.primary_tag] = post.tags;

		post.authors = taxonomies
			.filter((item) => item.post_id === post.id && item.type === "author")
			.sort((a, b) => b.sort_order - a.sort_order)
			.map((item) => id2authors[item.taxonomy_id]);
		[post.primary_author] = post.authors;

		return post;
	});
};

interface Taxonomy {
	type: string,
	post_id: string,
	taxonomy_id: string,
	sort_order: number
}

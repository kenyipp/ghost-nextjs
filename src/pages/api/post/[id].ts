import { getPost } from "@ghost/utils/getPosts";
import { PostOrPage } from "@tryghost/content-api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ data: PostOrPage }>
) {
	const id = req.query.id as string;
	const post = await getPost({ id });
	return res.json({ data: post });
}

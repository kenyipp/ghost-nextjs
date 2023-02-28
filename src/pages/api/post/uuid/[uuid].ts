import { knex } from "@ghost/knex";
import { getPost } from "@ghost/utils/getPosts";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const uuid = req.query.uuid as string;
	const id = await knex.first("id").from("posts").where("uuid", uuid).then((row) => row.id);
	if (!id) {
		return res.status(404).send({});
	}
	const post = await getPost({ id });
	return res.json({ data: post });
}

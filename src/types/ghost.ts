import { type PostOrPage, type Pagination } from "@tryghost/content-api";

export interface BrowsePostResponse {
	posts: PostOrPage[],
	meta: {
		pagination: Pagination
	}
}

export interface RelevantPostResponse {
	data: RelevantPost
}

export interface RelevantPost {
	tag: RelevantPostTag,
	relevant: PostOrPage[],
	relevantCount: number,
	latest: PostOrPage[]
}

export interface RelevantPostTag {
	id: string,
	name: string,
	slug: string
}

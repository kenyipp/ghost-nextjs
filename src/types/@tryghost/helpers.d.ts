declare module "@tryghost/helpers" {
	import { PostOrPage } from "@tryghost/content-api";

	declare function readingTime(post: PostOrPage, options?: ReadingTimeOptionsInput): string;
	declare const utils: Utils;
}

interface ReadingTimeOptionsInput {
	minute: string;
	minutes: string;
}

interface Utils {
	readingMinutes: (html?: string, additionalImages?: number) => number
}

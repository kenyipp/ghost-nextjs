import Link from "next/link";
import moment from "moment";
import classnames from "classnames";
import Balance from "react-wrap-balancer";
import { type PostOrPage } from "@tryghost/content-api";

export const ArticlePreview = ({
	post,
	horizontal
}: ArticlePreviewProps) => {
	return (
		<article className={classnames("article-preview", horizontal && "article-preview-horizontal")}>
			<Link
				className="article-preview-image"
				href={`/${post.slug}`}
			>
				<img
					title={post.title}
					src={post.feature_image || "/images/placeholder.jpg"}
					alt={post.feature_image_alt || post.title}
				/>
			</Link>
			<div className="article-preview-content">
				<ul className="article-tags">
					{
						post.tags?.map(tag => {
							return (
								<li key={tag.id}>
									<Link href={`/tag/${tag.slug}`}>
										{tag.name}
									</Link>
								</li>
							);
						})
					}
				</ul>
				<header className="article-preview-header">
					<Link
						className="inner"
						href={`/${post.slug}`}
					>
						<Balance
							className="article-preview-title"
							as="h2"
						>
							{post.title}
						</Balance>
					</Link>
				</header>
				<div className="article-preview-byline-content">
					<time>{moment(post.published_at).format("DD MMM YYYY")}</time>
					<span className="divider">•</span>
					<span>{moment.duration(post.reading_time, "minutes").humanize()} Read</span>
				</div>
				<section className="article-preview-excerpt">
					<p>{post.excerpt}...</p>
				</section>
			</div>
		</article>
	);
};

interface ArticlePreviewProps {
	post: PostOrPage,
	horizontal: boolean
}

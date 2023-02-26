import Link from "next/link";
import moment from "moment";
import Balance from "react-wrap-balancer";
import { PostOrPage } from "@tryghost/content-api";

export const Article = ({ post }: ArticleProps) => (
	<article className="article">
		<header className="article-header">
			<ul className="article-tags">
				{
					post.tags?.map((tag) => (
						<li key={tag.id}>
							<Link href={`/tag/${tag.slug}`}>
								{tag.name}
							</Link>
						</li>
					))
				}
			</ul>
			<Balance className="article-title" as="h1">{post.title}</Balance>
			<section className="article-excerpt">
				<p>{post.excerpt}</p>
			</section>
			{
				post.primary_author && (
					<div className="article-byline-content">
						{
							post.primary_author.profile_image && (
								<div className="article-author-image">
									<img src={post.primary_author.profile_image} />
								</div>
							)
						}
						<div className="article-author-description">
							<Link
								className="article-author-name"
								href={`/author/${post.primary_author.slug}`}
							>
								{post.primary_author.name}
							</Link>
							<div className="article-author-minutes-read">
								<time>{moment(post.published_at).format("DD MMM YYYY")}</time>
								<span className="divider">•</span>
								<span>{moment.duration(post.reading_time, "minutes").humanize()} Read</span>
							</div>
						</div>
					</div>
				)
			}
		</header>
		{
			post.feature_image && (
				<figure className="article-feature-image">
					<img
						src={post.feature_image}
						alt={post.feature_image_alt || post.title}
					/>
				</figure>
			)
		}
		<section className="article-content">
			<div
				className="inner"
				dangerouslySetInnerHTML={{ __html: post.html || post.excerpt || "" }}
			/>
		</section>
	</article>
);

interface ArticleProps {
	post: PostOrPage
}

export default Article;

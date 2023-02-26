import moment from "moment";
import { ArticlePreview } from "@ghost/components/ArticlePreview";
import { Grid } from "@mui/material";
import { type RelevantPost } from "@ghost/types";
import Link from "next/link";

export const RelevantArticles = ({
	tag, relevant, relevantCount, latest
}: RelevantArticlesProps) => {
	if (!tag || relevantCount < 1) {
		return (
			<div className="read-next">
				<Grid container>
					{
						latest
							.slice(0, 3)
							.map((post) => (
								<Grid
									key={post.id}
									item
									lg={4}
									sm={6}
									xs={12}
								>
									<ArticlePreview
										post={post}
										horizontal={false}
									/>
								</Grid>
							))

					}
				</Grid>
			</div>
		);
	}

	return (
		<div className="read-next">
			<Grid
				container
				rowSpacing={3}
			>
				<Grid
					item
					lg={4}
					sm={6}
					xs={12}
				>
					<div className="read-next-card">
						<h3>
							More In <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
						</h3>
						<ul className="read-next-card-content">
							{
								relevant.map((post) => (
									<li key={post.id}>
										<Link href={`/${post.slug}`}>
											<h6>{post.title}</h6>
										</Link>
										<div className="read-next-card-meta">
											<time>{moment(post.published_at).format("DD MMM YYYY")}</time>
											<span className="divider">•</span>
											<span>{moment.duration(post.reading_time, "minutes").humanize()} Read</span>
										</div>
									</li>
								))
							}
						</ul>
						<footer className="read-next-card-footer">
							<Link href={`/tag/${tag.slug}`}>
								{relevantCount} post →
							</Link>
						</footer>
					</div>
				</Grid>
				{
					relevant
						.slice(0, 2)
						.map((post) => (
							<Grid
								key={post.id}
								item
								lg={4}
								sm={6}
								xs={12}
							>
								<ArticlePreview
									post={post}
									horizontal={false}
								/>
							</Grid>
						))
				}
				{
					latest
						.slice(0, Math.max(2 - relevant.length, 0))
						.map((post) => (
							<Grid
								key={post.id}
								item
								lg={4}
								sm={6}
								xs={12}
							>
								<ArticlePreview
									post={post}
									horizontal={false}
								/>
							</Grid>
						))

				}
			</Grid>
		</div>
	);
};

type RelevantArticlesProps = RelevantPost;

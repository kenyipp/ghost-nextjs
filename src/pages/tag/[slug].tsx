import { useGhostClient } from "@ghost/hooks";
import { ArticlePreview, Pagination } from "@ghost/components";
import { PostOrPage } from "@tryghost/content-api";
import { type GetServerSideProps } from "next";
import { type Pagination as PaginationProps, Tag } from "@tryghost/content-api";
import { getGridSize } from "@ghost/utils";
import { Grid } from "@mui/material";

const TagPage = ({ tag, posts, pagination }: TagProps) => (
	<>
		<Grid
			container
			maxWidth="lg"
			margin="0 auto"
		>
			<header className="site-header">
				<h1 className="site-title">{tag.name}</h1>
				<h2 className="site-description">{pagination.total} posts</h2>
			</header>
		</Grid>
		<Grid
			container
			maxWidth="lg"
			margin="2rem auto"
		>
			{
				posts.map((post, index) => {
					const size = getGridSize(index);
					return (
						<Grid
							key={index}
							item
							lg={size.lg}
							md={size.md}
							sm={size.sm}
							xs={size.xs}
						>
							<ArticlePreview
								post={post}
								horizontal={index === 0}
							/>
						</Grid>
					);
				})
			}
			<Grid
				item
				xs={12}
			>
				<Pagination pagination={pagination} />
			</Grid>
		</Grid>
	</>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
	const client = useGhostClient();
	const slug = (typeof context.params?.slug === "string" && context.params?.slug) || "";
	const page = (typeof context.query.page === "string" && Number(context.query.page)) || 0;
	const [
		tag,
		posts
	] = await Promise.all([
		client.tags.read({ slug }),
		client.posts.browse({
			limit: 9,
			page,
			include: ["tags", "authors"],
			filter: `tags:[${slug}]`
		})
	]);
	return {
		props: {
			tag,
			posts,
			pagination: posts.meta.pagination
		}
	};
};

interface TagProps {
	tag: Tag,
	posts: PostOrPage[],
	pagination: PaginationProps
}

export default TagPage;

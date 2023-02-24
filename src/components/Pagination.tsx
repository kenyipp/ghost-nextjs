import { useRouter } from "next/router";
import classnames from "classnames";
import { type Pagination as PaginationProps } from "@tryghost/content-api";

export const Pagination = ({ pagination }: { pagination: PaginationProps }) => {
	const {
		push,
		query
	} = useRouter();
	return (
		<nav className="pagination">
			<a
				className={classnames("pagination-previous", pagination.prev == null && "disabled")}
				onClick={() => {
					if (pagination.prev) {
						push({ query: { ...query, page: pagination.prev } })
					}
				}}
			>
				Previous
			</a>
			<ul className="pagination-list">
				<li>
					<span>{pagination.page}</span>
					<span>/</span>
					<span>{pagination.pages}</span>
				</li>
			</ul>
			<a
				className={classnames("pagination-next", pagination.next == null && "disabled")}
				onClick={() => {
					if (pagination.next) {
						push({ query: { ...query, page: pagination.next } })
					}
				}}
			>
				Next
			</a>
		</nav>
	)
};

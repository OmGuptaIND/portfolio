import CreatePostForm from "./CreatePostForm";
import LogoutButton from "./LogoutButton";
import PostItem from "./PostItem";

interface AdminDashboardProps {
	user: {
		id: string;
		email: string;
	};
	posts: Array<{
		id: string;
		title: string;
		excerpt: string;
		url: string | null;
		tags: string[] | null;
		publishedAt: string | null;
		readTimeMinutes: number | null;
	}>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, posts }) => {
	return (
		<div className="space-y-10">
			<header className="flex flex-col gap-3 rounded-2xl border border-gray-200/60 bg-white/80 px-6 py-5 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
				<div>
					<p className="font-[family-name:var(--font-geist-sans)] text-gray-500 text-xs uppercase tracking-[0.3em] dark:text-gray-400">
						Admin
					</p>
					<h1 className="font-[family-name:var(--font-geist-sans)] font-semibold text-2xl text-gray-900 dark:text-gray-100">
						Content Control
					</h1>
					<p className="mt-1 font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm dark:text-gray-400">
						Signed in as <span className="font-medium">{user.email}</span>
					</p>
				</div>
				<LogoutButton />
			</header>

			<section className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
				<h2 className="mb-4 font-[family-name:var(--font-geist-sans)] font-semibold text-gray-900 text-lg dark:text-gray-100">
					Publish New Post
				</h2>
				<CreatePostForm />
			</section>

			<section className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
				<h2 className="mb-4 font-[family-name:var(--font-geist-sans)] font-semibold text-gray-900 text-lg dark:text-gray-100">
					Existing Posts
				</h2>
				{posts.length === 0 ? (
					<p className="font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm dark:text-gray-400">
						Nothing published yet. Your next write-up will appear here once you
						save it.
					</p>
				) : (
					<ul className="space-y-4">
						{posts.map((post) => (
							<li key={post.id}>
								<PostItem post={post} />
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
};

export default AdminDashboard;

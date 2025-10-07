import type React from "react";

interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	url?: string;
	tags?: string[];
}

interface BlogSectionProps {
	title: string;
	posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ title, posts }) => {
	return (
		<section className="mb-8">
			<h2 className="mb-6 font-[family-name:var(--font-geist-sans)] font-semibold text-lg">
				{title}
			</h2>
			<div className="space-y-6">
				{posts.map((post) => (
					<div
						key={post.id}
						className="border-gray-100 border-b pb-6 last:border-b-0"
					>
						<div className="mb-2 flex items-center space-x-2 text-gray-500 text-sm">
							<span>{post.date}</span>
							<span>•</span>
							<span>{post.readTime}</span>
						</div>
						<h3 className="mb-2 font-[family-name:var(--font-geist-sans)] font-medium text-gray-900">
							{post.title}
						</h3>
						<p className="mb-3 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm">
							{post.excerpt}
						</p>
						{post.tags && post.tags.length > 0 && (
							<div className="mb-3 flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full bg-gray-100 px-2 py-1 font-[family-name:var(--font-geist-sans)] text-gray-600 text-xs"
									>
										{tag}
									</span>
								))}
							</div>
						)}
						{post.url && (
							<a
								href={post.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block font-[family-name:var(--font-geist-sans)] text-blue-600 text-sm hover:text-blue-800"
							>
								Read more →
							</a>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogSection;

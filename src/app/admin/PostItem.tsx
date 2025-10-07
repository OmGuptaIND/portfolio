"use client";

import { Loader2, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { deleteBlogPost, updateBlogPost } from "./actions";

interface PostItemProps {
	post: {
		id: string;
		title: string;
		excerpt: string;
		url: string | null;
		tags: string[] | null;
		publishedAt: string | null;
		readTimeMinutes: number | null;
	};
}

const initialState = {
	error: undefined,
	success: undefined,
};

const formatDateTimeLocal = (value: string | null) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "";
	}
	const offset = date.getTimezoneOffset();
	const localDate = new Date(date.getTime() - offset * 60 * 1000);
	return localDate.toISOString().slice(0, 16);
};

const SubmitButton = ({ label }: { label: string }) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-emerald-600 px-4 py-2 font-[family-name:var(--font-geist-sans)] font-medium text-sm text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-500 dark:text-gray-50 dark:hover:bg-emerald-400"
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
					Saving…
				</>
			) : (
				label
			)}
		</button>
	);
};

const DeleteButton = ({ id }: { id: string }) => {
	const [isPending, startTransition] = useTransition();

	const onDelete = () => {
		const formData = new FormData();
		formData.append("id", id);
		startTransition(async () => {
			await deleteBlogPost(formData);
		});
	};

	return (
		<button
			type="button"
			onClick={onDelete}
			disabled={isPending}
			className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 font-[family-name:var(--font-geist-sans)] text-red-600 text-sm transition hover:border-red-300 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200 dark:hover:border-red-400 dark:hover:bg-red-900/60"
		>
			{isPending ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
					Removing…
				</>
			) : (
				<>
					<Trash2 className="h-4 w-4" aria-hidden="true" />
					Delete
				</>
			)}
		</button>
	);
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [state, formAction] = useFormState(updateBlogPost, initialState);

	useEffect(() => {
		if (state?.success) {
			setIsEditing(false);
		}
	}, [state?.success]);

	const formattedPublishedAt = useMemo(
		() => formatDateTimeLocal(post.publishedAt),
		[post.publishedAt],
	);

	return (
		<div className="rounded-2xl border border-gray-200/70 bg-white/90 p-5 shadow-sm ring-1 ring-black/5 dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h3 className="font-[family-name:var(--font-geist-sans)] font-semibold text-gray-900 text-xl dark:text-gray-100">
						{post.title}
					</h3>
					<p className="mt-1 font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm dark:text-gray-400">
						{post.excerpt}
					</p>
					<div className="mt-2 flex flex-wrap items-center gap-2 text-gray-500 text-xs dark:text-gray-400">
						{post.publishedAt && (
							<span>{new Date(post.publishedAt).toDateString()}</span>
						)}
						{post.readTimeMinutes && (
							<span>{post.readTimeMinutes} min read</span>
						)}
						{post.tags?.length ? <span>{post.tags.join(", ")}</span> : null}
					</div>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setIsEditing((prev) => !prev)}
						className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:text-gray-50"
					>
						<PencilLine className="h-4 w-4" aria-hidden="true" />
						{isEditing ? "Cancel" : "Edit"}
					</button>
					<DeleteButton id={post.id} />
				</div>
			</div>

			{isEditing && (
				<div className="mt-6 border-gray-200 border-t pt-6 dark:border-gray-700">
					<form className="space-y-4" action={formAction}>
						<input type="hidden" name="id" value={post.id} />
						<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
							<span className="font-medium">Title</span>
							<input
								name="title"
								defaultValue={post.title}
								required
								className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
							/>
						</label>
						<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
							<span className="font-medium">Excerpt</span>
							<textarea
								name="excerpt"
								defaultValue={post.excerpt}
								required
								rows={4}
								className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
							/>
						</label>
						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
								<span className="font-medium">Canonical URL</span>
								<input
									name="url"
									type="url"
									defaultValue={post.url ?? ""}
									className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
								/>
							</label>
							<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
								<span className="font-medium">Tags</span>
								<input
									name="tags"
									defaultValue={post.tags?.join(", ") ?? ""}
									className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
								/>
							</label>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
								<span className="font-medium">Published at</span>
								<input
									name="publishedAt"
									type="datetime-local"
									defaultValue={formattedPublishedAt}
									className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
								/>
							</label>
							<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
								<span className="font-medium">Read time (minutes)</span>
								<input
									name="readTime"
									type="number"
									min={1}
									defaultValue={post.readTimeMinutes ?? ""}
									className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
								/>
							</label>
						</div>
						{state.error && (
							<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-red-600 text-sm dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
								{state.error}
							</p>
						)}
						{state.success && (
							<p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-emerald-600 text-sm dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
								{state.success}
							</p>
						)}
						<div className="flex flex-wrap gap-3">
							<SubmitButton label="Save changes" />
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default PostItem;

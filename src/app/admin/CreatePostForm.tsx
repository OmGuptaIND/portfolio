"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { createBlogPost } from "./actions";

const initialState = {
	error: undefined,
	success: undefined,
};

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-blue-600 px-5 py-2 font-[family-name:var(--font-geist-sans)] text-sm font-medium text-white shadow transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-500 dark:text-gray-50 dark:hover:bg-blue-400"
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
					Publishing…
				</>
			) : (
				"Publish entry"
			)}
		</button>
	);
};

const TextInput = ({
	label,
	name,
	type = "text",
	placeholder,
	required = false,
}: {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
}) => (
	<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-sm text-gray-700 dark:text-gray-300">
		<span className="font-medium">{label}</span>
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			required={required}
			className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
		/>
	</label>
);

const TextArea = ({
	label,
	name,
	placeholder,
	required = false,
}: {
	label: string;
	name: string;
	placeholder?: string;
	required?: boolean;
}) => (
	<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-sm text-gray-700 dark:text-gray-300">
		<span className="font-medium">{label}</span>
		<textarea
			name={name}
			placeholder={placeholder}
			required={required}
			rows={4}
			className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
		/>
	</label>
);

const CreatePostForm: React.FC = () => {
	const [state, formAction] = useFormState(createBlogPost, initialState);

	return (
		<form className="space-y-4" action={formAction}>
			<TextInput
				label="Title"
				name="title"
				placeholder="Give the post a headline"
				required
			/>
			<TextArea
				label="Excerpt"
				name="excerpt"
				placeholder="Short summary that will appear on the homepage"
				required
			/>
			<TextInput
				label="Canonical URL"
				name="url"
				type="url"
				placeholder="https://yourdomain.com/article"
			/>
			<TextInput
				label="Tags"
				name="tags"
				placeholder="ai, startups, product"
			/>
			<div className="grid gap-4 sm:grid-cols-2">
				<TextInput
					label="Published at"
					name="publishedAt"
					type="datetime-local"
				/>
				<TextInput
					label="Read time (minutes)"
					name="readTime"
					type="number"
					placeholder="5"
				/>
			</div>
			{state.error && (
				<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-sm text-red-600 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
					{state.error}
				</p>
			)}
			{state.success && (
				<p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-sm text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
					{state.success}
				</p>
			)}
			<SubmitButton />
		</form>
	);
};

export default CreatePostForm;

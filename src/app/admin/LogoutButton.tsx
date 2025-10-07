"use client";

import { Loader2, LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

import { logoutAdmin } from "./actions";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm transition hover:border-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:text-gray-50"
		>
			{pending ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
					<span>Signing out…</span>
				</>
			) : (
				<>
					<LogOut className="h-4 w-4" aria-hidden="true" />
					<span>Sign out</span>
				</>
			)}
		</button>
	);
};

const LogoutButton: React.FC = () => {
	return (
		<form action={logoutAdmin}>
			<SubmitButton />
		</form>
	);
};

export default LogoutButton;

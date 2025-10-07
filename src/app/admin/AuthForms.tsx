"use client";

import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

import { loginAdmin, registerAdmin } from "./actions";

interface AuthFormsProps {
	hasUser: boolean;
}

const initialState = {
	error: undefined,
	success: undefined,
};

const SubmitButton: React.FC<{ label: string }> = ({ label }) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-gray-900 px-4 py-2 font-[family-name:var(--font-geist-sans)] font-medium text-gray-50 text-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
					Processing…
				</>
			) : (
				label
			)}
		</button>
	);
};

const Fieldset = ({
	label,
	name,
	type = "text",
	defaultValue = "",
	required = true,
}: {
	label: string;
	name: string;
	type?: string;
	defaultValue?: string;
	required?: boolean;
}) => (
	<label className="block space-y-1 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm dark:text-gray-300">
		<span className="font-medium">{label}</span>
		<input
			className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
			type={type}
			name={name}
			defaultValue={defaultValue}
			required={required}
		/>
	</label>
);

const RegisterForm = () => {
	const [state, formAction] = useFormState(registerAdmin, initialState);
	return (
		<div className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
			<h1 className="mb-2 font-[family-name:var(--font-geist-sans)] font-semibold text-2xl text-gray-900 dark:text-gray-100">
				Create the first admin
			</h1>
			<p className="mb-6 font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm dark:text-gray-400">
				This form is only shown while no admin exists. Keep these credentials
				private.
			</p>
			<form className="space-y-4" action={formAction}>
				<Fieldset label="Email" name="email" type="email" />
				<Fieldset label="Password" name="password" type="password" />
				<Fieldset
					label="Confirm password"
					name="confirmPassword"
					type="password"
				/>
				{state.error && (
					<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-red-600 text-sm dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
						{state.error}
					</p>
				)}
				<SubmitButton label="Create account" />
			</form>
		</div>
	);
};

const LoginForm = () => {
	const [state, formAction] = useFormState(loginAdmin, initialState);
	return (
		<div className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 dark:border-gray-700/60 dark:bg-gray-900/70 dark:ring-white/5">
			<h1 className="mb-2 font-[family-name:var(--font-geist-sans)] font-semibold text-2xl text-gray-900 dark:text-gray-100">
				Admin sign in
			</h1>
			<p className="mb-6 font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm dark:text-gray-400">
				Enter your credentials to manage posts.
			</p>
			<form className="space-y-4" action={formAction}>
				<Fieldset label="Email" name="email" type="email" />
				<Fieldset label="Password" name="password" type="password" />
				{state.error && (
					<p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-geist-sans)] text-red-600 text-sm dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
						{state.error}
					</p>
				)}
				<SubmitButton label="Sign in" />
			</form>
		</div>
	);
};

const AuthForms: React.FC<AuthFormsProps> = ({ hasUser }) => {
	return hasUser ? <LoginForm /> : <RegisterForm />;
};

export default AuthForms;

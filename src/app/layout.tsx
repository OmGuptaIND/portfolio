import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Playfair } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "itsomg - Personal website",
	description: "Om Gupta's personal website - engineer, entrepreneur, athlete",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const playfair = Playfair({
	subsets: ["latin"],
	variable: "--font-playfair",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable} ${playfair.variable}`}>
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}

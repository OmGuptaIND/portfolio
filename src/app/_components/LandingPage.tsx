"use client";

import { api } from "@/trpc/react";
import type React from "react";
import BlogSection from "./BlogSection";
import ProfileHeader from "./ProfileHeader";
import SocialLinks from "./SocialLinks";
import WorkSection from "./WorkSection";
import {
	currentActivities,
	profileData,
	socialLinks,
	workExperience,
} from "./portfolioData";

const LandingPage: React.FC = () => {
	const { data, isLoading, error } = api.blog.list.useQuery(undefined, {
		staleTime: 60_000,
		refetchOnWindowFocus: false,
	});

	const blogPosts = data?.posts ?? [];
	const errorMessage =
		data?.errorMessage ?? (error ? "Unable to load posts right now." : null);

	return (
		<main className="mx-auto min-h-screen max-w-4xl px-4 py-12">
			<div className="space-y-8">
				<ProfileHeader
					name={profileData.name}
					title={profileData.title}
					description={profileData.description}
				/>

				<SocialLinks links={socialLinks} />

				<WorkSection title="This is what I am doing" items={workExperience} />

				<WorkSection title="Wanna Connect?" items={currentActivities} />

				<BlogSection
					title="Latest Posts"
					posts={blogPosts}
					isLoading={isLoading}
					errorMessage={errorMessage}
				/>
			</div>
		</main>
	);
};

export default LandingPage;

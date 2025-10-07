"use client";

import type React from "react";
import BlogSection from "./BlogSection";
import ProfileHeader from "./ProfileHeader";
import ProjectSection from "./ProjectSection";
import SocialLinks from "./SocialLinks";
import WorkSection from "./WorkSection";
import {
	blogPosts,
	currentActivities,
	profileData,
	projects,
	socialLinks,
	workExperience,
} from "./portfolioData";

const LandingPage: React.FC = () => {
	return (
		<main className="mx-auto min-h-screen max-w-2xl px-6 py-12">
			<div className="space-y-8">
				{/* Profile Header */}
				<ProfileHeader
					name={profileData.name}
					title={profileData.title}
					description={profileData.description}
					age={profileData.age}
				/>

				{/* Social Links */}
				<SocialLinks links={socialLinks} />

				{/* Work Experience */}
				<WorkSection title="This is what I am doing" items={workExperience} />

				{/* Current Activities */}
				<WorkSection title="Current Activities" items={currentActivities} />

				{/* Projects */}
				<ProjectSection title="Other projects" projects={projects} />

				{/* Blog Section - Ready for when you add blogs */}
				<BlogSection title="Latest Posts" posts={blogPosts.slice(0, 3)} />
			</div>
		</main>
	);
};

export default LandingPage;

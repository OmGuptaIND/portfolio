"use client";

import type React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Project {
	id: string;
	title: string;
	description: string;
	image?: string;
	url?: string;
	status?: string;
}

interface ProjectSectionProps {
	title: string;
	projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ title, projects }) => {
	return (
		<section className="mb-8">
			<h2 className="mb-6 font-[family-name:var(--font-geist-sans)] font-semibold text-lg">
				{title}
			</h2>
			<div className="space-y-6">
				{projects.map((project) => (
					<div key={project.id} className="flex space-x-4">
						{project.image && (
							<div className="flex-shrink-0">
								<ImageWithFallback
									src={project.image}
									alt={`${project.title} preview`}
									className="h-12 w-12 rounded-lg object-cover"
								/>
							</div>
						)}
						<div className="min-w-0 flex-1">
							<div className="flex items-center space-x-2">
								<h3 className="font-[family-name:var(--font-geist-sans)] font-medium text-gray-900">
									{project.title}
								</h3>
								{project.status && (
									<span className="rounded-full bg-blue-100 px-2 py-1 font-[family-name:var(--font-geist-sans)] text-blue-800 text-xs">
										{project.status}
									</span>
								)}
							</div>
							<p className="mt-2 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm">
								{project.description}
							</p>
							{project.url && (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2 inline-block font-[family-name:var(--font-geist-sans)] text-blue-600 text-sm hover:text-blue-800"
								>
									View project →
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ProjectSection;

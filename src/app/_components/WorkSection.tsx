"use client";

import type React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface WorkItem {
	id: string;
	title: string;
	company: string;
	description: string;
	image?: string;
	url?: string;
}

interface WorkSectionProps {
	title: string;
	items: WorkItem[];
}

const WorkSection: React.FC<WorkSectionProps> = ({ title, items }) => {
	return (
		<section className="mb-8">
			<h2 className="mb-6 font-[family-name:var(--font-geist-sans)] font-semibold text-lg">
				{title}
			</h2>
			<div className="space-y-6">
				{items.map((item) => (
					<div key={item.id} className="flex space-x-4">
						{item.image && (
							<div className="flex-shrink-0">
								<ImageWithFallback
									src={item.image}
									alt={`${item.company} logo`}
									className="h-12 w-12 rounded-lg object-cover"
								/>
							</div>
						)}
						<div className="min-w-0 flex-1">
							<h3 className="font-[family-name:var(--font-geist-sans)] font-medium text-gray-900">
								{item.title}
							</h3>
							<p className="font-[family-name:var(--font-geist-sans)] text-gray-600 text-sm">
								{item.company}
							</p>
							<p className="mt-2 font-[family-name:var(--font-geist-sans)] text-gray-700 text-sm">
								{item.description}
							</p>
							{item.url && (
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2 inline-block font-[family-name:var(--font-geist-sans)] text-blue-600 text-sm hover:text-blue-800"
								>
									Learn more →
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default WorkSection;

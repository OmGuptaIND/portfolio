import type React from "react";

interface SocialLink {
	id: string;
	name: string;
	url: string;
	icon: React.ReactNode;
}

interface SocialLinksProps {
	links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
	return (
		<div className="mb-8 flex space-x-4">
			{links.map((link) => (
				<a
					key={link.id}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
					aria-label={link.name}
				>
					{link.icon}
				</a>
			))}
		</div>
	);
};

export default SocialLinks;

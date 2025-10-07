"use client";

import { useTheme } from "@/contexts/ThemeContext";

export interface SpotifySectionProps {
	title: string;
	description?: string;
	playlistSrc: string;
}

const SpotifySection: React.FC<SpotifySectionProps> = ({
	title,
	description,
	playlistSrc,
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const cardClass = `transition-colors ${
		isDark ? "bg-transparent" : "bg-transparent"
	}`;
	const titleClass = `font-[family-name:var(--font-geist-sans)] text-lg font-semibold ${
		isDark ? "text-gray-100" : "text-gray-900"
	}`;
	const descriptionClass = `mt-2 font-[family-name:var(--font-geist-sans)] text-sm ${
		isDark ? "text-gray-400" : "text-gray-600"
	}`;

	return (
		<section className={cardClass} aria-labelledby="spotify-playlist-heading">
			<div>
				<h2 id="spotify-playlist-heading" className={titleClass}>
					{title}
				</h2>
				{description ? <p className={descriptionClass}>{description}</p> : null}
			</div>
			<div className="mt-6 overflow-hidden rounded-xl">
				<iframe
					src={playlistSrc}
					title="Spotify playlist"
					className="h-[180px] w-full"
					loading="lazy"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					allowFullScreen
					frameBorder="0"
				/>
			</div>
		</section>
	);
};

export default SpotifySection;

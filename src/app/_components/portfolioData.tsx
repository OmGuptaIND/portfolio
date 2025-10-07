import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import type React from "react";

// Portfolio data - centralized content management
export const profileData = {
	name: "Om Gupta",
	title: "engineer, entrepreneur, athlete",
	description: (
		<div>
			An engineer turned builder who somehow ended up juggling half a dozen
			things at once and calling it life. I’ve always been the jack of all
			trades engineer by day, athlete by evening, again engineer by night XD.
			<br /> <br />
			I’ve built and scaled tech products, obsessed over performance (in code
			and in life), and spent just as much time chasing clarity as I do chasing
			finish lines.
			<br /> <br />
			At the core, I like creating, whether that’s startups, ideas, or the next
			version of myself.
		</div>
	),

	age: 21,
};

export const socialLinks = [
	{
		id: "twitter",
		name: "Twitter",
		url: "https://x.com/_its_omg",
		icon: <FaTwitter size={20} />,
	},
	{
		id: "github",
		name: "GitHub",
		url: "https://github.com/OmGuptaIND",
		icon: <FaGithub size={20} />,
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/om-gupta/",
		icon: <FaLinkedin size={20} />,
	},
];

export const workExperience = [
	{
		id: "huddle01",
		title: "Founding Engineer - Huddle01",
		company: "Huddle01",
		description:
			"Built the core Realtime infrastructure using WebRTC and other P2P technologies and scale it to 1000s of concurrent users with <100ms latency.",
		image: "/logo/huddle01.png",
		ctaLabel: "Visit Huddle01 →",
		imageClassName: "object-contain",
		url: "https://huddle01.com",
	},
	{
		id: "dataprism",
		title: "Building Dataprism",
		company: "Billionzeros",
		description:
			"Palantir for small and medium businesses. Building an all-in-one data platform to help businesses make data-driven decisions.",
		image: "/logo/billionzero.png",
		ctaLabel: "View Dataprism →",
		url: "https://github.com/billionzeros/dataprism",
	},
];

export const currentActivities = [
	{
		id: "meeting",
		title: "Book a meeting - Om Gupta",
		company: "Personal",
		description:
			"Connect with me 1:1 to chat about Tech, Business, Marketing or AI",
		image: "/logo/calendar.png",
		ctaLabel: "Book a meeting →",
		url: "https://calendly.com/omgupta0720/30min",
	},
];

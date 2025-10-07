import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import type React from "react";

// Portfolio data - centralized content management
export const profileData = {
	name: "Om Gupta",
	title: "engineer, entrepreneur, athlete",
	description:
		"Indian, living in Germany. I call myself the jack of all trades, basically an entrepreneur by day, athlete by the evening and philosopher by night. I used to play football, now I train like a hybrid athlete and eat burgers for cheatmeals. I am the marketing guy. I yap about tech, business or anything tbh.",
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
		image:
			"https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop",
		url: "https://huddle01.com",
	},
	{
		id: "dataprism",
		title: "Building Dataprism",
		company: "Billionzeros",
		description:
			"Palantir for small and medium businesses. Building an all-in-one data platform to help businesses make data-driven decisions.",
		image:
			"https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop",
		url: "https://github.com/billionzeros/dataprism",
	},
];

export const currentActivities = [
	{
		id: "meeting",
		title: "Book a meeting - Eshaan Kansal",
		company: "Personal",
		description:
			"Connect with me 1:1 to chat about Tech, Business, Marketing or AI",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
		url: "https://calendly.com/omgupta0720/30min",
	},
	{
		id: "instagram",
		title: "Main Instagram - @eshaan.kansal ✓",
		company: "Social Media",
		description: "This is where I yap about Tech, Business and life in general",
		image:
			"https://images.unsplash.com/photo-1611262588024-d12430b98920?w=100&h=100&fit=crop",
		url: "https://instagram.com/eshaan.kansal",
	},
	{
		id: "founders-kit",
		title: "Founder's Kit",
		company: "Product",
		description:
			"Build your startup within 7 days by pre built saas templates and ai automations and marketing guides for free.",
		image:
			"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
		url: "https://founderskit.com",
	},
];

export const projects = [
	{
		id: "socialease",
		title: "Founder - Socialease",
		description:
			"An online campus for business enthusiasts and skilled professionals to learn and earn. 1800+ people in the waitlist.",
		image:
			"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop",
		url: "https://socialease.com",
		status: "Active",
	},
];

// Sample blog posts - ready for when you add blog functionality
export const blogPosts = [
	{
		id: "ai-future",
		title: "The Future of AI in Business",
		excerpt:
			"Exploring how artificial intelligence is reshaping the business landscape and what entrepreneurs need to know.",
		date: "Oct 5, 2025",
		readTime: "5 min read",
		url: "/blog/ai-future",
		tags: ["AI", "Business", "Technology"],
	},
	{
		id: "startup-lessons",
		title: "5 Lessons I Learned Building My First Startup",
		excerpt:
			"Key insights and mistakes to avoid when starting your entrepreneurial journey.",
		date: "Sep 28, 2025",
		readTime: "8 min read",
		url: "/blog/startup-lessons",
		tags: ["Entrepreneurship", "Startups", "Lessons"],
	},
];

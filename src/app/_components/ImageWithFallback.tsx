"use client";

import type React from "react";
import { useState } from "react";

interface ImageWithFallbackProps {
	src: string;
	alt: string;
	className?: string;
	fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
	src,
	alt,
	className = "",
	fallbackSrc = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
}) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [isLoading, setIsLoading] = useState(true);

	const handleError = () => {
		if (imgSrc !== fallbackSrc) {
			setImgSrc(fallbackSrc);
		}
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className="relative">
			{isLoading && (
				<div className={`animate-pulse bg-gray-200 ${className}`} />
			)}
			<img
				src={imgSrc}
				alt={alt}
				className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
				onError={handleError}
				onLoad={handleLoad}
			/>
		</div>
	);
};

export default ImageWithFallback;

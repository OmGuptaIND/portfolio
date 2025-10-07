# Portfolio

A portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🧩 **Modular Components**: Easy to add, remove, or modify sections
- 📱 **Responsive Design**: Looks great on all devices
- ♿ **Accessible**: Built with accessibility in mind
- 🎨 **Clean UI**: Inspired by modern portfolio designs
- 📝 **Blog Ready**: Pre-built blog section for when you're ready to add content
- 🔧 **Easy to Customize**: All content managed from a single data file

## Components Structure

```
src/app/_components/
├── LandingPage.tsx          # Main layout component
├── ProfileHeader.tsx        # Name, title, description, and about section
├── SocialLinks.tsx          # Social media links with icons
├── WorkSection.tsx          # Work experience and current activities
├── ProjectSection.tsx       # Projects with status badges
├── BlogSection.tsx          # Blog posts (ready for future use)
├── ImageWithFallback.tsx    # Smart image loading with fallbacks
└── portfolioData.tsx        # All content and data in one place
```

## Customization

### Adding New Sections

1. Create a new component in `src/app/_components/`
2. Add your data to `portfolioData.tsx`
3. Import and use the component in `LandingPage.tsx`

### Modifying Content

All content is centralized in `src/app/_components/portfolioData.tsx`:

- `profileData`: Personal information
- `socialLinks`: Social media links with icons
- `workExperience`: Current work
- `currentActivities`: Other activities and projects
- `projects`: Major projects
- `blogPosts`: Blog posts (ready for blog feature)

### Adding Blog Functionality

The blog components are already built and ready. To activate:

1. Create blog post pages in `src/app/blog/[slug]/`
2. Update the `blogPosts` array in `portfolioData.tsx`
3. The `BlogSection` component will automatically display them

## Design Principles

- **Modular**: Each section is a separate, reusable component
- **Scalable**: Easy to add new sections without breaking existing ones
- **Maintainable**: All content in one centralized location
- **Flexible**: Components accept props for different use cases

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- React 19
- Biome (linting and formatting)

## Getting Started

1. Install dependencies: `npm install`
2. Update your information in `src/app/_components/portfolioData.tsx`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Future Enhancements

- Dark mode toggle (button already present in header)
- Blog functionality with markdown support
- Contact form
- Animation library integration
- CMS integration for easier content management
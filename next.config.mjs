const previewHost =
	process.env.BASE44_PREVIEW_MODE === "1" && process.env.BASE44_PUBLIC_HOST_SUFFIX
		? `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`
		: null;

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["better-sqlite3"],
		serverActions: previewHost ? { allowedOrigins: [previewHost] } : undefined
	}
};

export default nextConfig;

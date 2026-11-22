const previewHost =
	process.env.BASE44_PREVIEW_MODE === "1" && process.env.BASE44_PUBLIC_HOST_SUFFIX
		? `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`
		: null;

export const appOrigin = previewHost ? `https://${previewHost}` : (process.env.APP_ORIGIN ?? "http://localhost:3000");
export const secureCookies = appOrigin.startsWith("https://") || process.env.NODE_ENV === "production";

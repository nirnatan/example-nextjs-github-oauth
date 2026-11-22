import { GitHub } from "arctic";
import { appOrigin } from "./origin";

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID ?? "",
	process.env.GITHUB_CLIENT_SECRET ?? "",
	`${appOrigin}/login/github/callback`
);

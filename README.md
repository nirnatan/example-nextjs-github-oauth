# GitHub OAuth example in Next.js

Uses SQLite. Rate limiting is implemented using JavaScript `Map`.

## Initialize project

Create a GitHub OAuth app with the redirect URI pointed to `/login/github/callback`.

```
http://localhost:3000/login/github/callback
```

Paste the client ID and secret to a `.env` file.

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET="
```

Create `sqlite.db` and run `setup.sql`.

```
sqlite3 sqlite.db
```

Run the application:

```
pnpm dev
```

## Notes

- TODO: Update redirect URI

## Running in a Base44 (Base Code) sandbox

`docker-compose.base44.yml` and `.base44/environment.json` start the app on port 3000. The database is created on first start.

Register the GitHub OAuth app's callback as `https://3000-$BASE44_PUBLIC_HOST_SUFFIX/login/github/callback`, then set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as app secrets. Outside the sandbox, set `APP_ORIGIN` to override `http://localhost:3000`.

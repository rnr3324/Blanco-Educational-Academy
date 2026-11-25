# Blanco Educational Academy API

## Setup

1. Install Node.js and MongoDB Community Server, then start the local MongoDB service.
2. The local `Backend/.env` uses `mongodb://127.0.0.1:27017/blanco_academy`. For a fresh checkout, copy `.env.example` to `.env` and set a unique `JWT_SECRET` plus the initial `ADMIN_*` values. Never commit `.env`.
3. From this directory, run `npm install`.
4. Create the first admin account with `npm run seed:admin`. The script hashes the password and does not overwrite an existing account.
5. Load the existing public programs, campaigns, events, and gallery into the database with `npm run seed:content`. The seeder adds missing records and preserves items already present.
6. Start the API with `npm run dev`. Local development loads `Backend/.env` ahead of machine-level environment settings. It listens on port 5000 by default.

The API health endpoints are `/health` and `/api`. Admin sign-in is `POST /api/admin/login`; admin data routes require the returned bearer token. The CRUD API covers programs, campaigns, events, gallery, volunteer requests, contacts, donations, program applications, event registrations, and custom Home/About sections. Public pages load these collections from MongoDB, so admin changes appear on the site after the page is refreshed.

Admin API activity is available at `/admin/logs` in the frontend. The backend records API method, path, status, duration, request ID, origin, user agent, IP address, and authenticated admin email in MongoDB. Request and response bodies are not recorded. The endpoint `GET /api/admin/logs` is admin-only and supports `page`, `limit`, `search`, `method`, and `status` filters.

In the campaign manager, set a start and end date to schedule when a campaign appears on the public site. Past campaigns remain in the admin list and can be archived and edited. The account security page lets a signed-in admin change their login email and password together; the change requires the current password.

If startup reports `querySrv ETIMEOUT`, the backend could not resolve the MongoDB Atlas SRV hostname. Confirm the `MONGO_URI` hostname against Atlas's Connect dialog, verify the cluster is available, and retry from a network that can resolve Atlas DNS. If using local MongoDB instead, set `MONGO_URI=mongodb://127.0.0.1:27017/blanco_academy` and start the local MongoDB service first.

Source code lives under `src/`, grouped into `config`, `controllers`, `middleware`, `models`, `routes`, `scripts`, `seeds`, and `utils`. Start the server from the `Backend` directory so dotenv reads its root `.env` file.

## Frontend

Copy `Frontend/.env.example` to `Frontend/.env` if the API is not running at `http://localhost:5000`. Set `VITE_API_URL` to the API origin, then start the frontend from `Frontend` with `npm run dev`. The admin panel is at `/admin/login`.

Set `CLIENT_URL` to the primary frontend origin. Additional allowed origins can be listed in `CLIENT_URLS` as comma-separated URLs.

## Production deployment

- Use `Backend/.env.production.example` as a checklist, set `NODE_ENV=production`, a unique JWT secret of at least 32 characters, the deployed HTTPS frontend origin(s), MongoDB Atlas, and Cloudinary credentials. Do not commit `.env` files or provide production secrets to the frontend.
- Set `COOKIE_SAME_SITE=none` when the frontend and API are on different sites; HTTPS is required. Prefer hosting them under the same registrable domain or proxying `/api` through the frontend domain because some browsers restrict third-party cookies.
- Set `TRUST_PROXY=1` only when one trusted reverse proxy sits in front of the API. Match the value to the hosting topology so IP rate limits use the real client address.
- Build the frontend with `VITE_API_URL` set to the HTTPS API URL, or proxy `/api` on the same origin. A production build without `VITE_API_URL` calls the same origin.
- Device uploads go to Cloudinary in production. Local development can use the database fallback. Production refuses data-URL image writes.
- The built-in rate limiter is process-local; use a shared Redis-backed limiter if the API is deployed with multiple instances.
- Donations are stored as pending pledges and require manual admin confirmation. Configure and test a payment processor before describing them as completed online payments.
- Back up MongoDB and Cloudinary assets, restrict Atlas network access, and rotate any credentials that were ever committed or shared.

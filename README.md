A React portfolio showing: landing, about, skills, experience, projects, services, testimonials, blog, and contact.

## Fork & Run
1) Fork this repo.
2) Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/<your-fork>.git
   cd <your-fork>
   npm install
   npm start
   ```
3) Edit your info:
   - Content: `src/data/*`
   - Assets: `src/assets/*`
   - Theme: `src/data/themeData.js`

## Scripts
- `npm start` — dev
- `npm run build` — production bundle

## Deploy
Upload the `build` folder to Netlify, Vercel, or GitHub Pages (`public/_redirects` is included for SPA routing).
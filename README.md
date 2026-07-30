# Maxers Head Hunter — Starter Project

A basic Next.js + MySQL recruitment website scaffold: Home, Jobs, Job Detail,
Apply, About Us, Contact Us, plus Login/Signup (candidates only — no
company accounts).

## Stack
- **Next.js** (Pages Router) + React
- **Tailwind CSS** for styling
- **MySQL** via `mysql2`, raw SQL (no ORM, kept simple on purpose)
- **JWT + httpOnly cookie** for sessions, **bcryptjs** for password hashing

## 1. Install dependencies
```bash
npm install
```
> If you previously ran `npm install` with an older copy of this project,
> delete `node_modules` and `package-lock.json` first, then reinstall — this
> version pins Next.js 15 (Next 14 reached end-of-life in Oct 2025 and no
> longer receives security patches) and React 19. Requires Node.js 18.18+
> (Node 20+ recommended).

## 2. Set up MySQL
Create a database and load the schema (includes a few sample job postings):
```bash
mysql -u root -p -e "CREATE DATABASE maxers_headhunter"
mysql -u root -p maxers_headhunter < database/schema.sql
```

## 3. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your MySQL credentials and a
random JWT secret:
```bash
cp .env.example .env.local
```

## 4. Add the hero image
Drop a photo (per your brief: an Asian software developer) at:
```
public/images/hero.jpg
```
The homepage hero section (`pages/index.js`) already references this path
as its background image. Any landscape-oriented JPG/PNG works — 1600px wide
or more looks best.

## 5. Run the dev server
```bash
npm run dev
```
Visit http://localhost:3000

## Project structure
```
pages/
  index.js            -> Home
  jobs/index.js        -> Jobs listing (search/filter)
  jobs/[id].js          -> Job detail (server-rendered from MySQL)
  apply/[id].js         -> Apply for a job (requires login)
  about.js              -> About Us
  contact.js            -> Contact Us (saves to contact_messages table)
  login.js / signup.js  -> Auth pages
  api/
    auth/signup.js, login.js, logout.js, me.js
    jobs/index.js, [id].js
    applications/index.js
    contact.js
components/
  Navbar.jsx, Footer.jsx, JobCard.jsx
lib/
  db.js    -> MySQL connection pool
  auth.js  -> password hashing, JWT, cookie helpers
database/
  schema.sql -> tables + sample job data
```

## What's included
- Full candidate signup/login/logout with hashed passwords and JWT session
  cookies.
- Jobs are stored in MySQL and can be searched by keyword, category, and
  location.
- Applying to a job requires being logged in; applications are saved to the
  `applications` table linked to both the job and the user.
- Contact form messages are saved to the `contact_messages` table.
- No "companies" concept, per your spec — jobs just have a plain
  `employer_name` text field.

## What you'll likely want to add next
- A resume file upload (this scaffold uses a simple resume **link** field
  instead, to keep things basic — wire up S3/Cloudinary/etc. when ready).
- An admin view to manage job postings and review applications (currently
  jobs are managed directly in MySQL/schema.sql).
- Email notifications for new applications/contact messages.
- Password reset flow.

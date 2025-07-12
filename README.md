# 🚀 ProfNITT Admin Panel

A modern, secure, and scalable **Admin Panel** built using **Next.js App Router**, **TypeScript**, **MongoDB Atlas**, and **NextAuth**.  
Designed for the ProfNITT website, this dashboard allows authorized users to manage **Events**, **Projects**, **Team Members**, and **Gallery** content in a clean, role-based interface.

---

## 🌟 Core Functional Requirements

### 🔐 Authentication System
- ✅ Secure login system using NextAuth Credentials Provider
- ✅ Password validation with bcryptjs
- ✅ JWT-based session management

### 🧭 Dashboard Functionalities

#### 📅 Events Management
- ➕ Add Event: `title`, `description`, `date`, `venue`, `tags`, `image (optional)`
- ✏️ Update Event: Edit all event fields
- ❌ Remove Event: Delete any existing event

#### 💼 Projects Management
- ➕ Add Project: `title`, `description`, `tech used`, `status`, `GitHub/demo links`
- ✏️ Update Project: Modify any project data
- ❌ Remove Project: Clean project deletion

#### 👥 Team Members Management
- ➕ Add Member: `name`, `role`, `type`, `photo`, `bio`, `LinkedIn`
- ✏️ Update Member: Change roles/designation
- ❌ Remove Member: Delete from the team

#### 🖼 Gallery Management
- ➕ Add Image: Upload with `tags/captions`
- ✏️ Update Image: Replace or update metadata
- ❌ Remove Image: Delete permanently

---

## 🧠 Guidelines & Expectations

### 🎨 UI/UX
- Clean, responsive & elegant layout
- Theme aligned with ProfNITT branding
- Bonus: login history, interactive animations, graphs/stats

### 🛠 Tech Stack
- **Frontend**: Next.js (App Router) + Tailwind CSS (Planned)
- **Backend**: App Router APIs
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: NextAuth with JWT
- **Language**: TypeScript

### 📦 Modularity & Scalability
- Clean folder structure
- Reusable components and hooks
- Centralized auth guard
- Future-proof database models

---

## 🗂 Folder Structure

```
.
├── app/                      # App Router pages and API handlers
│   ├── login/               # Login screen
│   ├── admin/               # Protected dashboard routes
│   └── api/auth/[...nextauth]/route.ts
├── lib/                     
│   ├── mongodb.ts           # MongoDB connection logic
│   └── authGuard.ts         # Central SSR auth validator
├── models/
│   ├── User.ts              # Mongoose User schema
│   ├── Event.ts             # Event schema (planned)
│   ├── Project.ts           # Project schema (planned)
│   └── Member.ts            # Team member schema (planned)
├── types/
│   └── next-auth.d.ts       # NextAuth type extensions
├── public/                  # Static assets
├── .env.local               # Sensitive config (not committed)
└── README.md                # You're reading this 😉
```

---

## 🔐 Authentication Flow

1. Visit a protected route like `/admin`
2. If not logged in → redirect to `/login?callbackUrl=/admin`
3. On successful login → redirect back to the original route

Sessions are JWT-based and stored securely in memory.

---

## 🌱 Environment Variables

Create a `.env.local` file at the root with the following:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/profnitt
NEXTAUTH_SECRET=super-secret-value
```

---

## 🧪 Running the Project Locally

```bash
git clone <repo-url>
cd profnitt-admin-panel
npm install
touch .env.local      # Add Mongo URI and secret here
npm run dev
```

Visit `http://localhost:3000` 🚀

---

## 🧭 Features in Progress

| Feature            | Status     |
|-------------------|------------|
| Auth/Login         | ✅ Done
| Central Auth Guard | ✅ Done
| Add Events         | ✅ Done
| Add Projects       | ✅ Done
| Add Team Members   | ✅ Done
| Upload Gallery     | ✅ Done
| Responsive UI      | ✅ Done
| Dashboard Stats    | ✅ Done

---

## 💡 Developer Notes

- Built for long-term maintainability
- All auth logic is centralized via `withAuth()`
- Leverages modern App Router design patterns

---

## 📄 License

MIT © ProfNITT Developers
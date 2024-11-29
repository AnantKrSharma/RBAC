# Role-Based Web Application

A web application with role-based access control for **users**, **moderators**, and **admins**. Each role has specific actions they can perform, along with a frontend for performing their various respective operations.

<br>

## Getting Started

### Prerequisites
- Install Node.js: [Download here](https://nodejs.org/)
- Package Manager: **pnpm** (recommended) or **npm**

### Installation and Working
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <project-folder>

2. Install dependencies for both frontend and backend:

     - **Backend**:
      ```bash
      cd backend
      pnpm install  # or npm install
      ```

    <br>

    - **Frontend**:
      ```bash
      cd frontend
      pnpm install  # or npm install
      ```

3. Start the development servers:

    - **Backend** (run this in the first terminal):
      ```bash
      cd backend
      pnpm dev  # or npm run dev
      ```

    - **Frontend** (run this in a separate terminal):
      ```bash
      cd frontend
      pnpm dev  # or npm run dev
      ```

4. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`).

---

<br>

# Features

### General
- Users can register, log-in and log out securely.

- Robust User-Input validation through Zod.

- JWT based Authentication system for users, moderators, and admins.

- Password hashing to ensure data integrity of users.

- Role-based routing and access control (users, moderators and admins can only access resources they are authorized to).

- Effective backend authorization middlewares for managing user routes and permissions.

- Implemented Prisma ORM, simplifying backend development by offering type-safe database queries, reducing errors, ease in database migrations and boosting productivity.

### User Role
- Users can go through a set of blog posts available in the app.

### Moderator Roles
- Moderators can see a list of all the existing users.
- Moderators can see all the existing posts. 
- Moderators can create new posts, which can be seen by the users.

### Admin Roles
- Admins can see all the existing users as well as moderators.
- Admins can create new posts, which can be seen by the users as well as moderators.
- Admins can manipulate or delete existing users and moderators in the database.

<br>

---

# Tech Stack

### Frontend
- Framework/Library: **React.js**
- Styling: **Tailwind CSS**, **DaisyUI**

### Backend
- Framework: **Express.js**, **Node.js**, **Prisma ORM**
- Database:  **PostgreSQL**
- ORM: **Prisma ORM**
- Essential Libraries: **Zod**, **Bcryptjs (Hashing)**
---

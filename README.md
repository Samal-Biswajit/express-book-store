# 📚 Express Book Store

A RESTful API for managing books and authors, built with **Express.js 5**, **Drizzle ORM**, and **PostgreSQL**.

## ✨ Features

- Full CRUD operations for books and authors
- Full-text search on book titles using PostgreSQL GIN indexes
- Relational queries — fetch books by author, or a book with its author details
- Request logging middleware
- ES6 modules (`import` / `export`) throughout
- Database schema management with Drizzle Kit

## 🛠 Tech Stack

| Layer        | Technology              |
| ------------ | ----------------------- |
| Runtime      | Node.js 18+             |
| Framework    | Express.js 5            |
| ORM          | Drizzle ORM             |
| Database     | PostgreSQL 17           |
| Containers   | Docker Compose          |

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Docker](https://www.docker.com/) & Docker Compose — **or** a local PostgreSQL installation

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/express-book-store.git
cd express-book-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and edit it if needed:

```bash
cp .env.example .env
```

Default values in `.env.example`:

```env
DATABASE_URL=postgres://postgres:admin@localhost:5432/book-store
PORT=8000
```

### 4. Start the database

Using Docker:

```bash
docker-compose up -d
```

Or ensure your local PostgreSQL is running with a database named `book-store`.

### 5. Push the database schema

```bash
npm run db:push
```

This creates the `authors` and `books` tables along with indexes.

### 6. Start the server

```bash
npm start
```

The server starts at **http://localhost:8000** with file-watching enabled for development.

## 📡 API Endpoints

### Authors

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/authors`           | Get all authors        |
| GET    | `/authors/:id`       | Get author by ID       |
| POST   | `/authors`           | Create a new author    |
| GET    | `/authors/:id/books` | Get all books by author|

### Books

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/books`             | Get all books                |
| GET    | `/books?search=term` | Full-text search on titles   |
| GET    | `/books/:id`         | Get book by ID (with author) |
| POST   | `/books`             | Create a new book            |
| DELETE | `/books/:id`         | Delete a book                |

## 📝 API Usage Examples

### Create an Author

```bash
curl -X POST http://localhost:8000/authors \
  -H "Content-Type: application/json" \
  -d '{"firstName": "George", "lastName": "Orwell", "email": "george@example.com"}'
```

```json
{
  "message": "Author has been created",
  "id": "a1b2c3d4-..."
}
```

### Create a Book

```bash
curl -X POST http://localhost:8000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "1984", "description": "A dystopian novel", "authorId": "a1b2c3d4-..."}'
```

```json
{
  "message": "Book created successfully",
  "id": "e5f6g7h8-..."
}
```

### Search Books

```bash
curl http://localhost:8000/books?search=1984
```

## 📁 Project Structure

```
express-book-store/
├── controllers/
│   └── book.controller.js    # Book route handlers
├── db/
│   └── index.js              # Drizzle database connection
├── middlewares/
│   └── logger.js             # Request logging middleware
├── models/
│   ├── author.model.js       # Author table schema
│   ├── book.model.js         # Book table schema (with GIN index)
│   └── index.js              # Schema barrel exports
├── routes/
│   ├── authors.routes.js     # Author routes
│   └── books.routes.js       # Book routes
├── .env.example              # Environment variable template
├── .gitignore
├── docker-compose.yml        # PostgreSQL container setup
├── drizzle.config.js         # Drizzle Kit configuration
├── index.js                  # Application entry point
├── package.json
└── README.md
```

## 🗄 Database Schema

```
┌──────────────────────┐       ┌──────────────────────────┐
│       authors        │       │          books           │
├──────────────────────┤       ├──────────────────────────┤
│ id        UUID (PK)  │◄──────│ authorId  UUID (FK)      │
│ firstName VARCHAR(55)│       │ id        UUID (PK)      │
│ lastName  VARCHAR(55)│       │ title     VARCHAR(100)   │
│ email     VARCHAR(255)│      │ description TEXT         │
└──────────────────────┘       └──────────────────────────┘
```

## 📜 Available Scripts

| Script           | Command                   | Description                          |
| ---------------- | ------------------------- | ------------------------------------ |
| `npm start`      | `node --watch index.js`   | Start dev server with file watching  |
| `npm run db:push`| `drizzle-kit push`        | Push schema changes to the database  |
| `npm run db:generate` | `drizzle-kit generate` | Generate SQL migration files        |
| `npm run db:migrate`  | `drizzle-kit migrate`  | Run pending migrations              |
| `npm run db:studio`   | `drizzle-kit studio`   | Open Drizzle Studio GUI             |

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

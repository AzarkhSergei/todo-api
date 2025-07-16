# TODO API

A minimal task management API built with Node.js and Express.

## 📦 Features

- Create a task
- Update task status
- Delete a task
- Retrieve tasks with optional status filter

## 🚀 Getting Started

### ✅ Run with Docker (Preferred)

```bash
docker run -p 3000:3000 azarkhsergei/todo-api
```

> You can also build manually if needed:

```bash
docker build -t todo-api .
docker run -p 3000:3000 todo-api
```

---

## 📚 API Endpoints

### ➕ POST `/tasks`

Create a new task

**Request body:**

```json
{
  "text": "Buy milk",
  "status": "in progress"
}
```

**Response:**

```json
{
  "id": 1,
  "text": "Buy milk",
  "status": "in progress"
}
```

---

### 📋 GET `/tasks`

Retrieve all tasks. You can filter by status.

**Query parameters:**

- `status`: `"in progress"` or `"completed"`

**Examples:**

- `/tasks`
- `/tasks?status=completed`

**Response:**

```json
[
  {
    "id": 1,
    "text": "Buy milk",
    "status": "completed"
  }
]
```

---

### 🔄 PATCH `/tasks/:id`

Update the status of an existing task. Only `status` can be updated.

**Request body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "id": 1,
  "text": "Buy milk",
  "status": "completed"
}
```

❗ Attempting to update `text` will return an error:

```json
{
  "error": "Updating text is not allowed."
}
```

---

### 🗑 DELETE `/tasks/:id`

Delete a task by its ID.

**Response:**

```json
{
  "id": 1,
  "text": "Buy milk",
  "status": "completed"
}
```

---

## ⚠️ Notes

- Tasks are stored in memory (they are lost when the server restarts)
- No authentication or database used
- For demonstration and testing purposes only

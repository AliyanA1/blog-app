# Blogify 📝  
A Feature-Rich Full-Stack Blog Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Tech Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20Express.js%20%7C%20MongoDB%20%7C%20EJS-brightgreen)

---

## 📖 Overview

**Blogify** is a full-stack, dynamic blog platform built with **Node.js**, **Express.js**, **MongoDB**, and the **EJS templating engine**. It provides a secure and intuitive space for users to write, edit, and publish blog posts with ease. Blogify is designed with a strong focus on **clean architecture**, **security**, and **usability**.

---

## ✨ Key Features

- 🔐 **User Authentication & Authorization**  
  Register, log in, and manage sessions securely using best practices.

- ✍️ **Create, Edit, and Delete Blog Posts**  
  Powerful blog editor supporting full CRUD operations.

- 🛡️ **Role-Based Access Control**  
  Only the author of a post can modify or delete it.

- 📄 **Dynamic Frontend with EJS**  
  Responsive and mobile-friendly UI powered by server-side rendering.

- 📦 **MongoDB Integration**  
  Efficient NoSQL data handling for fast performance.

- 🧩 **Modular Code Structure**  
  Clean, scalable, and maintainable codebase using MVC architecture.

---

## 🛠️ Tech Stack

| Technology     | Usage                        |
|----------------|------------------------------|
| Node.js        | Runtime Environment           |
| Express.js     | Backend Web Framework         |
| MongoDB        | Database                      |
| Mongoose       | ODM for MongoDB               |
| EJS            | Templating Engine             |
| bcrypt         | Password Hashing              |
| express-session| Session Management            |
| connect-mongo  | MongoDB-backed session store  |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running locally or remotely

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogify.git
   cd blogify

  
  `bash  npm install


  ```bash
   Set environment variables
   Create a .env file in the root with the following:
   MONGO_URI=mongodb://localhost:27017/blogify
   SESSION_SECRET=your_secret_key
   PORT=3000

   `bash npm start


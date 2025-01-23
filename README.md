**Note:** This app is not anywhere near production-grade. It was built as part of my learning journey in React + Cloudflare workers + Typescript.

# Medium Blog App

This is a feature-rich blogging platform inspired by Medium. Users can create and manage blog posts, read content, and engage with other users. The project is built with a modern tech stack and emphasizes scalability, performance, and security.

## Features

- **User Authentication:** Secure sign-up and sign-in using JWT.
- **Blog Management:** Create, edit, and delete blog posts.

#### Soon to be added features:-

- **Rich Text Editing:** Craft engaging posts with an intuitive editor.
- **Responsive Design:** Seamless experience across devices.
- **User Interaction:** Comment and like posts to engage with the community.

## Tech Stack

### Frontend:

- **React**: Component-based UI framework for building interactive interfaces.
- **TypeScript**: Enhances code quality and developer productivity.
- **Zod**: Schema-based validation and type inference.

### Backend:

- **Cloudflare Workers**: Serverless environment for scalable backend logic.
- **Prisma**: ORM with connection pooling for efficient database operations.
- **PostgreSQL**: Relational database for structured data storage.

### Common:

- This folder includes the Zod types required in both frontend and backend.
  I have published it as a npm package- [Link](https://www.npmjs.com/package/@ritesh0605/medium-common)

### Authentication:

- **JWT**: Secure authentication mechanism.
- **Cookies-Based Approach**: Explored for alternative session management.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/riteshgarg0605/Medium-Blog-App.git
   cd Medium-Blog-App
   ```

2. **Install dependencies:**

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory of both `frontend` and `backend`.
   - Add required variables, such as database connection string, JWT secret, etc.

4. **Run the application:**
   - Frontend:
     ```bash
     npm start
     ```
   - Backend:
     ```bash
     npm run dev
     ```

## Usage

- Navigate to the frontend at `http://localhost:3000`.
- Access backend APIs at `http://localhost:5000` (or configured port).

## Project Structure

```
Medium-Blog-App/
├── frontend/       # React application
├── backend/        # Cloudflare Workers backend
├── prisma/         # Database schema and migrations
└── README.md       # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, reach out to [Ritesh Garg](mailto:riteshgarg0605@gmail.com).

---

Happy coding! 🚀

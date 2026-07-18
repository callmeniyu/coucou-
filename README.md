# 💬 Coucou - Real-Time Chat Application

A modern, full-stack real-time chat application where users can create password-protected rooms and chat instantly. Built with the MERN stack and Socket.io for blazing-fast real-time communication.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🌟 Features

- 🔐 **Password-Protected Rooms** - Create or join rooms with secure password authentication
- ⚡ **Real-Time Messaging** - Instant message delivery powered by Socket.io
- 👥 **Live User List** - See who's currently in your room
- 💾 **Message Persistence** - All messages are saved to MongoDB and loaded on join
- 📱 **Responsive Design** - Mobile-first UI that works beautifully on all devices
- 🔔 **Toast Notifications** - User-friendly feedback with animated toast messages
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS v4
- 🌊 **Smooth Animations** - Tab transitions, scroll-to-bottom, and message animations

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Socket.io Client** - Real-time bidirectional communication
- **React Router v7** - Client-side routing
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **React Scroll To Bottom** - Auto-scroll chat

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **Socket.io** - Real-time engine
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📂 Project Structure

```
chat_application/
├── coucou/
│   ├── client/              # React frontend
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page components (Join, Chat)
│   │   │   ├── context/     # React Context (Toast)
│   │   │   └── lib/         # Utility functions
│   │   └── package.json
│   │
│   └── server/              # Express + Socket.io backend
│       ├── src/
│       │   ├── config/      # Database configuration
│       │   ├── controllers/ # Route handlers
│       │   ├── models/      # Mongoose models
│       │   ├── routes/      # API routes
│       │   ├── utils/       # Helper functions
│       │   └── index.js     # Entry point
│       └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/coucou-chat.git
   cd coucou-chat
   ```

2. **Install server dependencies**
   ```bash
   cd coucou/server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create `.env` in `coucou/server/`:
   ```env
   MONGO_URI=mongodb://localhost:27017/coucou
   PORT=3000
   SALT_ROUNDS=10
   ```

   Create `.env` in `coucou/client/`:
   ```env
   VITE_ENDPOINT=http://localhost:3000
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Run the application**

   **Terminal 1 - Backend:**
   ```bash
   cd coucou/server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd coucou/client
   npm run dev
   ```

7. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage

1. **Join or Create a Room**
   - Enter your username, room ID/name, and password
   - Click "Join Room" if the room exists
   - Click "Create Room" to start a new one

2. **Chat in Real-Time**
   - Type your message and hit send
   - See messages instantly from other users
   - View active users in the sidebar

3. **Persistent History**
   - All messages are saved to the database
   - Previous messages load automatically when you rejoin

---

## 🔌 API Endpoints

### REST API
- `GET /health` - Server health check
- `POST /room/createRoom` - Create a new chat room
- `POST /room/joinRoom` - Join an existing room

### Socket.io Events

**Client → Server:**
- `join` - Join a chat room
- `sendMessage` - Send a message to the room
- `disconnect` - Leave the room

**Server → Client:**
- `message` - Receive a new message
- `roomData` - Updated user list
- `previousMessages` - Load chat history

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd coucou/client
npm run build
```
Deploy the `dist/` folder to Vercel.

### Backend (Render)
- **Root Directory:** `coucou/server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- Add environment variables in Render dashboard

### Database (MongoDB Atlas)
- Create a free M0 cluster
- Whitelist IP: `0.0.0.0/0` (for Render)
- Copy connection string to `MONGO_URI`

---

## 🎓 Key Learnings

Building this project taught me:

### Technical Skills
- **Real-Time Communication** - Implemented WebSocket connections using Socket.io for instant messaging
- **RESTful API Design** - Built clean, modular Express routes and controllers
- **Authentication & Security** - Implemented bcrypt password hashing with Mongoose pre-save hooks
- **State Management** - Managed complex chat state with React hooks and Context API
- **Database Design** - Modeled relationships between Users, Rooms, and Messages in MongoDB
- **Form Validation** - Used Zod for type-safe schema validation
- **Modern UI/UX** - Built responsive interfaces with Tailwind CSS v4 and shadcn/ui

### Soft Skills
- **Problem Solving** - Debugged deployment issues (case-sensitivity on Linux vs Windows)
- **Full-Stack Thinking** - Understood how frontend, backend, and database work together
- **Code Organization** - Structured a scalable monorepo with clear separation of concerns
- **Documentation** - Wrote clear, maintainable code with comments

### DevOps
- **Environment Management** - Used `.env` files and `dotenv` for config management
- **Deployment** - Successfully deployed full-stack apps to Vercel and Render
- **Cross-Platform Compatibility** - Learned to avoid Windows-only filesystem assumptions

---

## 🐛 Challenges Faced

1. **Socket.io + Vercel** - Discovered Vercel's serverless functions don't support persistent WebSocket connections well, leading me to use Render for the backend
2. **Case-Sensitivity Bugs** - Code that worked on Windows failed on Linux due to file case mismatches (`Room.js` vs `room.js`)
3. **Password Hashing** - Ensured bcrypt hooks trigger correctly with Mongoose's `pre('save')` middleware
4. **Real-Time State Sync** - Kept user lists and messages consistent across multiple clients
5. **MongoDB Integration** - Handled cold-start connection issues in serverless environments

---

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Direct messaging between users
- [ ] File/image sharing in chats
- [ ] Message reactions and replies
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Dark/Light theme toggle
- [ ] Push notifications
- [ ] Message search functionality

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- Socket.io documentation for real-time implementation guidance
- shadcn/ui for the beautiful component library
- MongoDB Atlas for free database hosting
- Render for reliable backend hosting
- Vercel for seamless frontend deployment

---

## 📸 Screenshots

<img width="922" height="451" alt="Screenshot 2026-07-18 100705" src="https://github.com/user-attachments/assets/7d697863-eae9-4303-bda8-11fb10ad8448" />


---

**⭐ If you found this project helpful, please give it a star on GitHub!**

Made with ❤️ and lots of ☕

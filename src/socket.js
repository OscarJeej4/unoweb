import { io } from "socket.io-client";

// Replace with your Render backend URL:
const socket = io("https://your-backend-service.onrender.com");

export default socket;

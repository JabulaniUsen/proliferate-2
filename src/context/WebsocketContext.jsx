import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://proliferate-2.onrender.com/ws/chat");
    setSocket(ws);

    ws.onopen = () => console.log("WebSocket connection established");
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => ws.close(); // Clean up the WebSocket connection on component unmount
  }, []);

  const sendMessage = async (senderId, receiverId, content) => {
    const message = { senderId, receiverId, content };

    try {
      // Send via WebSocket
      if (socket) {
        socket.send(JSON.stringify(message));
      }
      // Also send via HTTP API
      await axios.post(
        "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/chat/sendMessage",
        message
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebsocket = () => {
  const context = useContext(WebSocketContext);
  
  if (!context) {
    throw new Error("useWebsocket must be used within a WebSocketProvider");
  }

  return context;
};

export interface User {
    email: string;
    password: string;
  }

export interface UserRegistor {
    name: string;
    email: string;
    password: string;
  }

  export interface ChatUser {
    id: number;
    name: string;
    email: string;
    // Add other properties as needed
  }

  export interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: Date;
    // Add other properties as needed
  }
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
  id: string;
  name: string;
  email: string;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
}

export interface MessageHistory {
  userId: string;
  before: string;
  count: string;
  sort: string;
}
export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  receiverId: string;
  isEditing: boolean;
}
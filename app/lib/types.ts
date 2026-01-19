export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type AuthToken = {
  access_token: string;
  token_type: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type ChatMessage = {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export type ChatSession = {
  id: string;
  title?: string;
  preview?: string;
  created_at?: string;
  messages?: ChatMessage[];
};

export type ChatSendRequest = {
  message: string;
  conversation_id?: string | null;
};

export type ChatSendResponse = {
  conversation_id: string;
  reply: string;
};


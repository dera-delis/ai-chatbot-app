import axios from "axios";

import { AuthCredentials, AuthToken, ChatSendRequest, ChatSendResponse, ChatSession, User } from "./types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 20000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const signup = async (payload: AuthCredentials): Promise<User> => {
  const { data } = await api.post<User>("/auth/signup", payload);
  return data;
};

export const login = async (payload: AuthCredentials): Promise<AuthToken> => {
  const { data } = await api.post<AuthToken>("/auth/login", payload);
  return data;
};

export const me = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export const getConversations = async (): Promise<ChatSession[]> => {
  const { data } = await api.get<ChatSession[]>("/conversations");
  return data;
};

export const getConversation = async (conversationId: string): Promise<ChatSession> => {
  const { data } = await api.get<ChatSession>(`/conversations/${conversationId}`);
  return data;
};

export const sendChatMessage = async (
  payload: ChatSendRequest,
): Promise<ChatSendResponse> => {
  const { data } = await api.post<ChatSendResponse>("/chat", payload);
  return data;
};


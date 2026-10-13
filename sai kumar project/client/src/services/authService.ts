import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refresh: refreshToken,
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getStoredUser() {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("user");
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },
};


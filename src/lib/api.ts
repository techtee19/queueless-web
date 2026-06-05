import axios from "axios";

const normalizeUrl = (url: string) => {
  const trimmedUrl = url.trim().replace(/\/$/, "");

  if (/^https?:\/\//.test(trimmedUrl)) return trimmedUrl;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?/.test(trimmedUrl)) return `http://${trimmedUrl}`;

  return `https://${trimmedUrl}`;
};

const resolveApiBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
  const trimmedUrl = normalizeUrl(configuredUrl);

  return trimmedUrl.endsWith("/api/v1") ? trimmedUrl : `${trimmedUrl}/api/v1`;
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — redirect to login
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Only redirect if not already on login/register page
      if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

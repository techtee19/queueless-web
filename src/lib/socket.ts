import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const normalizeUrl = (url: string) => {
  const trimmedUrl = url.trim().replace(/\/$/, "");

  if (/^https?:\/\//.test(trimmedUrl)) return trimmedUrl;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?/.test(trimmedUrl)) return `http://${trimmedUrl}`;

  return `https://${trimmedUrl}`;
};

const resolveSocketUrl = () => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SOCKET_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  return normalizeUrl(configuredUrl).replace(/\/api\/v1\/?$/, "");
};

export function getSocket(): Socket {
  if (!socket) {
    socket = io(resolveSocketUrl(), {
      auth: {
        token: typeof window !== "undefined" ? localStorage.getItem("accessToken") : "",
      },
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket(): void {
  if (socket?.connected) socket.disconnect();
}

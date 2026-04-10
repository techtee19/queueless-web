import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueLess — Stop Waiting. Start Living.",
  description: "Join queues remotely, track your position live, and get notified when it's your turn.",
  icons: {
    icon: "/queue.favicon.png",
    shortcut: "/queue.favicon.png",
    apple: "/queue.favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/queue.favicon.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-stone-50 text-stone-900 antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#1c1917", color: "#fff", borderRadius: "12px" },
          }}
        />
      </body>
    </html>
  );
}

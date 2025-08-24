import { useState, useEffect } from "react";

export default function Boot() {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => setCount((c) => c - 1), 1000);
    const interval = setInterval(async () => {
      try {
        const apiRes = await fetch(import.meta.env.VITE_API_URL + "/health");
        const dashRes = await fetch(import.meta.env.VITE_DASHBOARD_URL + "/health");
        if (apiRes.ok && dashRes.ok) {
          window.location.href = "/";
        }
      } catch (e) {
        console.log("Still waking up...");
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold">Warming up servers…</h1>
      <p className="mt-2">Trying to connect. Redirecting in {count}s</p>
      {count <= 0 && (
        <p className="mt-4">
          If not redirected,{" "}
          <a
            href={import.meta.env.VITE_DASHBOARD_URL}
            className="text-blue-600 underline"
          >
            click here
          </a>
        </p>
      )}
    </div>
  );
}

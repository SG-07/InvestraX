export async function pingBackend() {
  const url = import.meta.env.VITE_API_URL + "/health"; 

  try {
    await fetch(url, { cache: "no-store" });
    console.log("✅ Warmed up:", url);
  } catch (err) {
    console.warn("⚠️ Failed to ping:", url);
  }
}

export function pingDashboard() {
  // Use an <img> to bypass CORS
  const img = new Image();
  img.src = import.meta.env.VITE_DASHBOARD_URL + "/";
  img.onload = () => console.log("✅ Dashboard pinged successfully");
  img.onerror = () => console.warn("⚠️ Dashboard ping failed");
}
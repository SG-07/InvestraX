export async function pingBackend() {
  const url = import.meta.env.VITE_API_URL + "/health"; 

  try {
    await fetch(url, { cache: "no-store" });
    console.log("✅ Warmed up:", url);
  } catch (err) {
    console.warn("⚠️ Failed to ping:", url);
  }
}

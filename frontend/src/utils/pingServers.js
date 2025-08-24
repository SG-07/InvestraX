export async function pingServers() {
  const urls = [
    import.meta.env.VITE_API_URL + "/health",
    import.meta.env.VITE_DASHBOARD_URL + "/health"
  ];

  for (const url of urls) {
    try {
      await fetch(url, { cache: "no-store" });
      console.log("✅ Warmed up:", url);
    } catch (err) {
      console.warn("⚠️ Failed to ping:", url);
    }
  }
}
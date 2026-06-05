module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const payload = request.body || {};
    const visit = {
      type: "visit",
      timestamp: String(payload.timestamp || new Date().toISOString()),
      page: String(payload.page || "/"),
      referrer: String(payload.referrer || "Direct"),
      userAgent: String(payload.userAgent || ""),
      language: String(payload.language || ""),
      screen: String(payload.screen || ""),
      timezone: String(payload.timezone || "")
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      response.status(501).json({ ok: false, message: "GOOGLE_SCRIPT_URL is not configured in Vercel." });
      return;
    }

    const sheetResponse = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visit)
    });

    if (!sheetResponse.ok) {
      response.status(502).json({ ok: false, message: "Google Sheets endpoint did not accept the visit." });
      return;
    }

    response.status(200).json({ ok: true, message: "Visit stored successfully." });
  } catch (error) {
    response.status(500).json({ ok: false, message: "Visit could not be stored.", error: error.message });
  }
};

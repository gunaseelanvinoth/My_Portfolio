module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const payload = request.body || {};
    const message = {
      timestamp: new Date().toISOString(),
      name: String(payload.name || "").trim(),
      email: String(payload.email || "").trim(),
      phone: String(payload.phone || "").trim(),
      message: String(payload.message || "").trim()
    };

    if (!message.name || !message.email || !message.message) {
      response.status(400).json({ ok: false, message: "Name, email, and message are required." });
      return;
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      response.status(501).json({
        ok: false,
        message: "GOOGLE_SCRIPT_URL is not configured in Vercel."
      });
      return;
    }

    const sheetResponse = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    if (!sheetResponse.ok) {
      response.status(502).json({ ok: false, message: "Google Sheets endpoint did not accept the message." });
      return;
    }

    response.status(200).json({ ok: true, message: "Message stored successfully." });
  } catch (error) {
    response.status(500).json({ ok: false, message: "Message could not be stored.", error: error.message });
  }
};

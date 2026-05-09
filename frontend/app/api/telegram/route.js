const TELEGRAM_API = "https://api.telegram.org";

async function resolveChatId(token) {
  // Use env var if set
  if (process.env.TELEGRAM_CHAT_ID) return process.env.TELEGRAM_CHAT_ID;

  // Auto-detect from the most recent message sent to the bot
  const res = await fetch(
    `${TELEGRAM_API}/bot${token}/getUpdates?limit=20&allowed_updates=["message"]`
  );
  const data = await res.json();

  if (!data.ok || data.result.length === 0) return null;

  // Pick the latest message's chat id
  const withMsg = data.result.filter((u) => u.message?.chat?.id);
  return withMsg.length > 0
    ? String(withMsg[withMsg.length - 1].message.chat.id)
    : null;
}

export async function POST(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return Response.json(
      { error: "TELEGRAM_BOT_TOKEN is not configured" },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message, language } = body;
  if (!message?.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  const chatId = await resolveChatId(token);
  if (!chatId) {
    return Response.json(
      {
        error:
          "Could not find a chat ID. Send /start to your bot in Telegram first, " +
          "then set TELEGRAM_CHAT_ID in .env.local.",
      },
      { status: 503 }
    );
  }

  const text =
    `📩 <b>Нове повідомлення з сайту PRORAB</b>\n\n` +
    `${message.trim()}\n\n` +
    `🌐 Мова: <i>${language ?? "UA"}</i>`;

  const sendRes = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  const sendData = await sendRes.json();
  if (!sendData.ok) {
    console.error("[telegram/route] Telegram API error:", sendData);
    return Response.json({ error: sendData.description }, { status: 500 });
  }

  return Response.json({ success: true });
}

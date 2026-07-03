import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { readFileSync } from "node:fs";
import path from "node:path";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

const persona = readFileSync(path.join(process.cwd(), "content/persona.md"), "utf8");

export async function POST(req: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ error: "chat_unavailable" }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }
  const body = await req.text();
  if (body.length > 16_000) {
    return Response.json({ error: "too_long" }, { status: 400 });
  }
  let messages: UIMessage[];
  try {
    ({ messages } = JSON.parse(body) as { messages: UIMessage[] });
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (!Array.isArray(messages) || messages.length > 40) {
    return Response.json({ error: "too_long" }, { status: 400 });
  }

  const result = streamText({
    model: process.env.CHAT_MODEL ?? "openai/gpt-4o-mini",
    system: persona,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

import { GoogleGenerativeAI } from "@google/generative-ai"

// --- Gemini key rotation ---
const geminiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean)

let geminiIndex = 0

export async function callGemini(prompt, retries = 0) {
  if (geminiKeys.length === 0) throw new Error("No Gemini API keys configured")
  if (retries >= geminiKeys.length * 3) throw new Error("Gemini is currently unavailable due to high demand. Please try again in a minute.")

  const keyIdx = Math.floor(retries / 3) % geminiKeys.length
  const key    = geminiKeys[keyIdx]
  const genAI  = new GoogleGenerativeAI(key)

  // Try 2.5-flash first, fall back to 1.5-flash on 503
  const modelName = retries >= geminiKeys.length ? "gemini-1.5-flash" : "gemini-2.5-flash"
  const model     = genAI.getGenerativeModel({ model: modelName })

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (err) {
    const msg       = err?.message ?? ""
    const status    = err?.status  ?? 0
    const is429     = status === 429 || msg.includes("429") || msg.includes("quota")
    const is503     = status === 503 || msg.includes("503") || msg.includes("unavailable") || msg.includes("high demand")
    const isRetry   = is429 || is503

    if (isRetry) {
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.min(4000, 1000 * Math.pow(2, retries % 3))
      await new Promise((r) => setTimeout(r, delay))
      return callGemini(prompt, retries + 1)
    }
    throw err
  }
}

// --- Groq client (OpenAI-compatible) ---
export async function callGroq(messages, retries = 0) {
  if (!process.env.GROQ_API_KEY) throw new Error("No Groq API key configured")
  if (retries >= 3) throw new Error("Groq rate limit exceeded, try again later")

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get("retry-after") ?? "5", 10)
    await new Promise((r) => setTimeout(r, retryAfter * 1000))
    return callGroq(messages, retries + 1)
  }

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq error: ${err}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ""
}
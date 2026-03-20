import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { systemPrompt } from '@/lib/systemPrompt';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const convertedMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.parts
      ? m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
      : m.content,
  }));

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt,
    messages: convertedMessages,
  });

  return result.toUIMessageStreamResponse();
}
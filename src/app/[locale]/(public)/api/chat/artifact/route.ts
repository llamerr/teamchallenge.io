import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { action, contextPrompt, generatePrompt, currentInput } = await req.json();

  // Validate input
  if (!action || !['suggest', 'generate'].includes(action)) {
    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
  }

  try {
    let prompt;
    const model = google('gemini-2.0-flash');

    // Determine which model to use based on the action
    if (action === 'suggest') {
      prompt
      = `${contextPrompt}\n\n`
        + `Current input: "${currentInput}"\n\n`
        + `Complete this input with a natural continuation. Only provide the continuation text, not the full response.`;
    } else {
      prompt
      = `${generatePrompt}\n\n`
        + `Please generate appropriate text for this field. `
        + `The text should be concise, professional, and relevant to an artifact in a development project. `
        + `Do not communicate in any way with the user, only provide text suitable as a response to this field. `
        + `Current input is: "${currentInput}"\n\n`
        + `Try generating something completely different from the current input.`;
    }

    // console.log('Prompt:', prompt);

    const result = streamText({
      model,
      temperature: 1,
      messages: [
        { role: 'system', content: 'You are a helpful assistant for generating development artifact content.' },
        { role: 'user', content: prompt },
      ],
    });

    // (async () => {
    //   for await (const textPart of result.textStream) {
    //     console.log(textPart);
    //   }
    // })();

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

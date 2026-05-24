'use server';
/**
 * @fileOverview A Genkit flow that generates personalized romantic texts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveTextInputSchema = z.object({
  prompt: z.string().describe('A prompt or specific context for the romantic text.'),
  mood: z.string().optional().describe('The desired mood or tone for the romantic text.'),
  language: z.string().default('sw').describe('The target language code.'),
});
export type GenerateLoveTextInput = z.infer<typeof GenerateLoveTextInputSchema>;

const GenerateLoveTextOutputSchema = z.object({
  generatedText: z.string().describe('The AI-generated romantic text.'),
});
export type GenerateLoveTextOutput = z.infer<typeof GenerateLoveTextOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateLoveTextPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: GenerateLoveTextInputSchema},
  output: {schema: GenerateLoveTextOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are an AI assistant specialized in crafting personalized romantic texts. 

IMPORTANT: You MUST generate the text in the following language: {{{language}}}.

User's prompt: {{{prompt}}}
{{#if mood}}Desired mood: {{{mood}}}{{/if}}

Please generate a romantic text that matches the user's prompt and desired mood. Focus on creating a single, coherent message.`,
});

export async function generateLoveText(input: GenerateLoveTextInput): Promise<GenerateLoveTextOutput> {
  const {output} = await prompt(input);
  return output!;
}

export const generateLoveTextFlow = ai.defineFlow(
  {
    name: 'generateLoveTextFlow',
    inputSchema: GenerateLoveTextInputSchema,
    outputSchema: GenerateLoveTextOutputSchema,
  },
  async (input) => {
    return generateLoveText(input);
  }
);

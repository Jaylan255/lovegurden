'use server';
/**
 * @fileOverview A Genkit flow that generates personalized romantic texts based on user prompts, moods, and target language.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveTextInputSchema = z.object({
  prompt: z.string().describe('A prompt or specific context for the romantic text.'),
  mood: z.string().optional().describe('The desired mood or tone for the romantic text.'),
  language: z.string().default('sw').describe('The target language code (e.g., "sw" for Swahili, "en" for English, "fr" for French).'),
});
export type GenerateLoveTextInput = z.infer<typeof GenerateLoveTextInputSchema>;

const GenerateLoveTextOutputSchema = z.object({
  generatedText: z.string().describe('The AI-generated romantic text.'),
});
export type GenerateLoveTextOutput = z.infer<typeof GenerateLoveTextOutputSchema>;

export async function generateLoveText(input: GenerateLoveTextInput): Promise<GenerateLoveTextOutput> {
  return generateLoveTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLoveTextPrompt',
  input: {schema: GenerateLoveTextInputSchema},
  output: {schema: GenerateLoveTextOutputSchema},
  prompt: `You are an AI assistant specialized in crafting personalized romantic texts. 
Your goal is to generate unique and heartfelt messages based on the user's input.

IMPORTANT: You MUST generate the text in the following language: {{{language}}}.
If the language is a Tanzanian tribal language (like Sukuma, Chaga, etc.), do your best to translate into that specific dialect.

User's prompt: {{{prompt}}}
{{#if mood}}Desired mood: {{{mood}}}{{/if}}

Please generate a romantic text that matches the user's prompt and desired mood. Focus on creating a single, coherent message.`,
});

const generateLoveTextFlow = ai.defineFlow(
  {
    name: 'generateLoveTextFlow',
    inputSchema: GenerateLoveTextInputSchema,
    outputSchema: GenerateLoveTextOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

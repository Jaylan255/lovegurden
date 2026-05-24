'use server';
/**
 * @fileOverview A Genkit flow that generates creative responses for love mini-games.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayLoveGameInputSchema = z.object({
  gameType: z.enum([
    'fortune', 'nickname', 'movie', 'goal', 'song', 'date', 'mood', 'gift', 'bucket-list', 'quiz', 'kiss-comment'
  ]).describe('The type of mini-game.'),
  language: z.string().default('sw').describe('The target language code.'),
  context: z.string().optional().describe('Optional context.'),
});
export type PlayLoveGameInput = z.infer<typeof PlayLoveGameInputSchema>;

const PlayLoveGameOutputSchema = z.object({
  result: z.string().describe('The AI-generated response.'),
});
export type PlayLoveGameOutput = z.infer<typeof PlayLoveGameOutputSchema>;

const prompt = ai.definePrompt({
  name: 'playLoveGamePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: PlayLoveGameInputSchema},
  output: {schema: PlayLoveGameOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are the AI Cupid, a romantic expert. 
Provide a creative, unique, and engaging response for the game: {{{gameType}}}.

IMPORTANT: Language: {{{language}}}.

{{#if context}}Context: {{{context}}}{{/if}}

Game Instructions:
- fortune: Short romantic prediction.
- nickname: Original cute nickname.
- movie: "Movie Title (Year): [Brief romantic reason]".
- goal: Relationship goal.
- song: "Artist - Title" (soulful vibe).
- date: Unique date idea.
- mood: Romantic activity for this mood.
- gift: Thoughtful gift idea.
- bucket-list: Once-in-a-lifetime experience.
- quiz: Deep question for partners.
- kiss-comment: Cheeky sweet comment about high kissing score.

Keep it concise and heartfelt.`,
});

export async function playLoveGame(input: PlayLoveGameInput): Promise<PlayLoveGameOutput> {
  const {output} = await prompt(input);
  return output!;
}

export const playLoveGameFlow = ai.defineFlow(
  {
    name: 'playLoveGameFlow',
    inputSchema: PlayLoveGameInputSchema,
    outputSchema: PlayLoveGameOutputSchema,
  },
  async (input) => {
    return playLoveGame(input);
  }
);

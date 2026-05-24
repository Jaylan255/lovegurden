'use server';
/**
 * @fileOverview A Genkit flow that generates multi-chapter stories based on user prompts and desired genre/language.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  prompt: z.string().describe('The core idea or prompt for the story.'),
  genre: z.string().optional().describe('The genre of the story (e.g., Romance, Drama, Thriller).'),
  language: z.string().default('sw').describe('The target language code.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const ChapterSchema = z.object({
  chapterNumber: z.number(),
  chapterTitle: z.string(),
  content: z.string().describe('The detailed content of this chapter.'),
});

const GenerateStoryOutputSchema = z.object({
  title: z.string().describe('The title of the generated story.'),
  chapters: z.array(ChapterSchema).describe('The chapters of the story.'),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: GenerateStoryOutputSchema},
  prompt: `You are a professional storyteller specializing in captivating and emotional narratives.
Your goal is to write a multi-chapter story based on the user's prompt.

The story should be structured into several chapters (at least 3). 
Each chapter should build upon the previous one, creating a coherent and engaging narrative arc.

IMPORTANT: You MUST write the entire story in the following language: {{{language}}}.
If the language is a Tanzanian tribal language, use the specific dialect as best as possible.

User's Story Idea: {{{prompt}}}
{{#if genre}}Desired Genre: {{{genre}}}{{/if}}

Please generate a compelling story title and the detailed content for each chapter.`,
});

const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

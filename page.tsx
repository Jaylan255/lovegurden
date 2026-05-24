'use server';
/**
 * @fileOverview A Genkit flow that generates multi-chapter stories.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  prompt: z.string().describe('The core idea or prompt for the story.'),
  genre: z.string().optional().describe('The genre of the story.'),
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

const prompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: GenerateStoryOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are a professional storyteller specializing in captivating and emotional narratives.

IMPORTANT: You MUST write the entire story in the following language: {{{language}}}.

User's Story Idea: {{{prompt}}}
{{#if genre}}Desired Genre: {{{genre}}}{{/if}}

Please generate a compelling story title and the detailed content for at least 3 chapters.`,
});

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  const {output} = await prompt(input);
  return output!;
}

export const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    return generateStory(input);
  }
);

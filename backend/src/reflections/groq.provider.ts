import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqProvider {
    private readonly client: Groq;

    constructor() {
        this.client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateSentenceStarters(
        currentContent: string,
        previousEntries: string[],
    ): Promise<string[]> {
        const context = previousEntries
            .map((entry, index) => `Previous entry ${index + 1}:\n${entry}`)
            .join('\n\n');

        const response = await this.client.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: `You are a journaling assistant for an outdoor journal.
                    Your job is to help the user continue writing in their own voice. 
                    Generate exactly 3 short sentence starters.
                    Use previous journal entries only to understand recurring themes, experiences and interests.
                    
                    Do not invent memories or events.
                    Do not write complete journal paragraphs.
                    Do not copy sentences from previous entries.
                    Keep each suggestion under 20 words`.trim(),
                },
                {
                    role: 'user',
                    content: `CURRENT JOURNAL ENTRY: ${currentContent}
                    PREVIOUS JOURNAL ENTRIES: ${context}`.trim(),
                },
            ],

            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'sentence_starters',
                    strict: false,
                    schema: {
                        type: 'object',
                        properties: {
                            starters: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        text: {
                                            type: 'string',
                                        },
                                    },
                                    required: ['text'],
                                    additionalProperties: false,
                                },
                            },
                        },
                        required: ['starters'],
                        additionalProperties: false,
                    },
                },
            },

            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Groq returned an empty response');
        }

        const parsed = JSON.parse(content) as {
            starters: { text: string }[];
        };

        return parsed.starters.map((starter) => starter.text);
    }
}
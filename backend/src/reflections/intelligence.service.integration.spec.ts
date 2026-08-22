import { Test, type TestingModule } from '@nestjs/testing';
import { IntelligenceService } from './intelligence.service';
import { GroqProvider } from './groq.provider';
import { ReflectionsRepository } from './reflections.repository';

describe('IntelligenceService integration', () => {
  let intelligenceService: IntelligenceService;
  let app: TestingModule;

  const mockGroqProvider = {
    chatGeneration: jest.fn(),
  };

  const mockReflectionsRepository = {};

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        IntelligenceService,
        {
          provide: ReflectionsRepository,
          useValue: mockReflectionsRepository,
        },
        {
          provide: GroqProvider,
          useValue: mockGroqProvider,
        },
      ],
    }).compile();

    intelligenceService = app.get(IntelligenceService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns no suggestions when there is no previous content', async () => {
    const result = await intelligenceService.generateSentenceStarters(
      'I went for a walk by the river.',
      [],
    );

    expect(result).toEqual([]);
    expect(mockGroqProvider.chatGeneration).not.toHaveBeenCalled();
  });

  it('generates sentence starter suggestions from prior entries', async () => {
    mockGroqProvider.chatGeneration.mockResolvedValue([
      'Keep going with the ridge.',
      'The weather changed the mood.',
      'I felt calmer after the hike.',
    ]);

    const result = await intelligenceService.generateSentenceStarters(
      'Today I wanted to stay outside longer.',
      [
        'Yesterday I walked along the river and watched the light change.',
        'I have been thinking about getting back on the trail.',
      ],
    );

    expect(mockGroqProvider.chatGeneration).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          role: 'system',
          content: expect.stringContaining('Generate exactly 3 short sentence starters.'),
        }),
        expect.objectContaining({
          role: 'user',
          content: expect.stringContaining('CURRENT JOURNAL ENTRY: Today I wanted to stay outside longer.'),
        }),
      ]),
      expect.objectContaining({
        type: 'json_schema',
        json_schema: expect.objectContaining({
          name: 'sentence_starters',
          schema: expect.objectContaining({
            properties: expect.objectContaining({
              starters: expect.any(Object),
            }),
          }),
        }),
      }),
    );

    expect(mockGroqProvider.chatGeneration.mock.calls[0][0][1].content).toContain(
      'Previous entry 1:\nYesterday I walked along the river and watched the light change.',
    );
    expect(mockGroqProvider.chatGeneration.mock.calls[0][0][1].content).toContain(
      'Previous entry 2:\nI have been thinking about getting back on the trail.',
    );

    expect(result).toEqual([
      { type: 'sentence_starter', text: 'Keep going with the ridge.' },
      { type: 'sentence_starter', text: 'The weather changed the mood.' },
      { type: 'sentence_starter', text: 'I felt calmer after the hike.' },
    ]);
  });
});

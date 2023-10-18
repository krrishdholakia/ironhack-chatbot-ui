import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import {
  cleanData,
  isExportFormatV1,
  isExportFormatV2,
  isExportFormatV3,
  isExportFormatV4,
  isLatestExportFormat,
} from '@/utils/app/importExport';

import { ExportFormatV1, ExportFormatV2, ExportFormatV4 } from '@/types/export';
import { OpenAIModelID, OpenAIModels } from '@/types/openai';

describe('Export Format Functions', () => {
  test('isExportFormatV1 should return true for v1 format', () => {
    const obj = [{ id: 1 }];
    expect(isExportFormatV1(obj)).toBe(true);
  });

  test('isExportFormatV1 should return false for non-v1 formats', () => {
    const obj = { version: 3, history: [], folders: [] };
    expect(isExportFormatV1(obj)).toBe(false);
  });

  test('isExportFormatV2 should return true for v2 format', () => {
    const obj = { history: [], folders: [] };
    expect(isExportFormatV2(obj)).toBe(true);
  });

  test('isExportFormatV2 should return false for non-v2 formats', () => {
    const obj = { version: 3, history: [], folders: [] };
    expect(isExportFormatV2(obj)).toBe(false);
  });

  test('isExportFormatV3 should return true for v3 format', () => {
    const obj = { version: 3, history: [], folders: [] };
    expect(isExportFormatV3(obj)).toBe(true);
  });

  test('isExportFormatV3 should return false for non-v3 formats', () => {
    const obj = { version: 4, history: [], folders: [] };
    expect(isExportFormatV3(obj)).toBe(false);
  });

  test('isExportFormatV4 should return true for v4 format', () => {
    const obj = { version: 4, history: [], folders: [], prompts: [] };
    expect(isExportFormatV4(obj)).toBe(true);
  });

  test('isExportFormatV4 should return false for non-v4 formats', () => {
    const obj = { version: 5, history: [], folders: [], prompts: [] };
    expect(isExportFormatV4(obj)).toBe(false);
  });
});

describe('cleanData Functions', () => {
  test('cleaning v1 data should return the latest format', () => {
    const data = [
      {
        id: 1,
        name: 'conversation 1',
        messages: [
          {
            role: 'user',
            content: "what's up ?",
          },
          {
            role: 'assistant',
            content: 'Hi',
          },
        ],
      },
    ] as ExportFormatV1;
    const obj = cleanData(data);
    expect(isLatestExportFormat(obj)).toBe(true);
    expect(obj).toEqual({
      version: 4,
      history: [
        {
          id: 1,
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      ],
      folders: [],
      prompts: [],
    });
  });

  test('cleaning v2 data should return the latest format', () => {
    const data = {
      history: [
        {
          id: '1',
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
        },
      ],
      folders: [
        {
          id: 1,
          name: 'folder 1',
        },
      ],
    } as ExportFormatV2;
    const obj = cleanData(data);
    expect(isLatestExportFormat(obj)).toBe(true);
    expect(obj).toEqual({
      version: 4,
      history: [
        {
          id: '1',
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      ],
      folders: [
        {
          id: '1',
          name: 'folder 1',
          type: 'chat',
        },
      ],
      prompts: [],
    });
  });

  test('cleaning v4 data should return the latest format', () => {
    const data = {
      version: 4,
      history: [
        {
          id: '1',
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      ],
      folders: [
        {
          id: '1',
          name: 'folder 1',
          type: 'chat',
        },
      ],
      prompts: [
        {
          id: '1',
          name: 'prompt 1',
          description: '',
          content: '',
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          folderId: null,
        },
      ],
    } as ExportFormatV4;

    const obj = cleanData(data);
    expect(isLatestExportFormat(obj)).toBe(true);
    expect(obj).toEqual({
      version: 4,
      history: [
        {
          id: '1',
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      ],
      folders: [
        {
          id: '1',
          name: 'folder 1',
          type: 'chat',
        },
      ],
      prompts: [
        {
          id: '1',
          name: 'prompt 1',
          description: '',
          content: '',
          model: OpenAIModels[OpenAIModelID.GPT_3_5],
          folderId: null,
        },
      ],
    });
  });
});

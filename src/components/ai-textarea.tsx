'use client';

import { useCompletion } from '@ai-sdk/react';
import { ActionIcon, Textarea, Tooltip } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

type AITextareaProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minRows?: number;
  contextPrompt: string;
  generatePrompt: string;
};

export function AITextarea({
  label,
  placeholder,
  value,
  onChange,
  required,
  minRows = 4,
  contextPrompt,
  generatePrompt,
}: AITextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { completion, input, isLoading, setInput, handleInputChange, complete } = useCompletion({
    api: '/api/chat/artifact',
    initialInput: value,
    body: {
      action: 'generate',
      contextPrompt,
      generatePrompt,
      currentInput: value,
    },
  });

  useEffect(() => {
    onChange(completion);
    setInput(completion);
  }, [completion, onChange, setInput]);

  // Generate complete text
  const generateFullText = async () => {
    try {
      // Send generation request
      complete(input);

      // Wait for response and apply text
      if (input) {
        onChange(input.trim());
      }
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      <Textarea
        ref={textareaRef}
        label={label}
        placeholder={placeholder}
        value={completion}
        onChange={handleInputChange}
        required={required}
        minRows={minRows}
        resize="vertical"
        rightSection={(
          <Tooltip label="Generate AI text">
            <ActionIcon
              onClick={generateFullText}
              loading={isLoading}
              disabled={isLoading}
              variant="subtle"
              color="blue"
            >
              <Sparkles size={16} />
            </ActionIcon>
          </Tooltip>
        )}
        rightSectionProps={{
          style: {
            right: 15,
            alignItems: 'flex-start',
            marginTop: 15,
          },
        }}
      />
    </div>
  );
}

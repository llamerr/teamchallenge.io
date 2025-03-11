'use client';

import { useCompletion } from '@ai-sdk/react';
import { ActionIcon, TextInput, Tooltip } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

type AITextInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  contextPrompt: string;
  generatePrompt: string;
};

export function AITextInput({
  label,
  placeholder,
  value,
  onChange,
  required,
  contextPrompt,
  generatePrompt,
}: AITextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <TextInput
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        required={required}
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
      />
    </div>
  );
}

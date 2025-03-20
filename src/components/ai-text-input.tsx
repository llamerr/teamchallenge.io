'use client';

import { useCompletion } from '@ai-sdk/react';
import { ActionIcon, TextInput, Tooltip } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

type AITextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  contextPrompt: string;
  generatePrompt: string;
};

export function AITextInput({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  contextPrompt,
  generatePrompt,
}: AITextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { completion, input, isLoading, setInput, complete } = useCompletion({
    api: '/api/chat/artifact',
    initialInput: value,
    body: {
      action: 'generate',
      contextPrompt,
      generatePrompt,
      currentInput: value,
    },
  });

  // https://github.com/vercel/ai/blob/82c0c5cd474d3f5550a6eb6f36eabd672724f076/packages/react/src/use-completion.ts#L206
  const handleInputChange = useCallback(
    (e: any) => {
      setInput(e.target.value);
      onChange(e.target.value);
    },
    [setInput, onChange],
  );

  useEffect(() => {
    if (value !== completion && isLoading) {
      onChange(completion);
      setInput(completion);
    }
  }, [completion, onChange, setInput, value, isLoading]);

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
        name={name}
        label={label}
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        required={required}
        disabled={isLoading}
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

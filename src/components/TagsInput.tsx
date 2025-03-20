'use client';

import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import { useState } from 'react';

type TagsInputProps = {
  value: Array<{ value: string; label: string }>;
  onChange: (tags: Array<{ value: string; label: string }>) => void;
  placeholder?: string;
  predefinedTags?: Array<{ value: string; label: string }>;
};

// TODO: add fuzzy search
// TODO: add icons for frameworks/techs
function getFilteredOptions(
  data: Array<{ value: string; label: string }>,
  value: Array<{ value: string; label: string }>,
  searchQuery: string,
  limit: number,
): Array<{ value: string; label: string }> {
  const result: Array<{ value: string; label: string }> = [];

  for (let i = 0; i < data.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    const isAlreadySelected = value.some(tag => tag.value === data[i]?.value);
    const hasValue = data[i]?.value?.toLowerCase().includes(searchQuery.trim().toLowerCase());

    if (hasValue && !isAlreadySelected) {
      result.push(data[i]!);
    }
  }

  return result;
}

export function TagsInput({
  value,
  onChange,
  placeholder = 'Add tags...',
  predefinedTags = [],
}: TagsInputProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');

  const handleValueSelect = (val: string) =>
    onChange(
      value.includes({ value: val, label: val })
        ? value.filter(v => v.value !== val)
        : [...value, { value: val, label: val }],
    );

  const handleValueRemove = (val: { value: string; label: string }) =>
    onChange(value.filter(v => v.value !== val.value));

  const values = value.map(item => (
    <Pill key={item.value} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item.label}
    </Pill>
  ));

  const options = getFilteredOptions(predefinedTags, value, search, 5)
    .map(item => (
      <Combobox.Option value={item.value} key={item.value} active={value.some(v => v.value === item.value)}>
        <Group gap="sm">
          {value.some(v => v.value === item.value) ? <CheckIcon size={12} /> : null}
          <span>{item.label}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
                    event.preventDefault();
                    const prevValue = value[value.length - 1];
                    handleValueRemove(prevValue as { value: string; label: string });
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

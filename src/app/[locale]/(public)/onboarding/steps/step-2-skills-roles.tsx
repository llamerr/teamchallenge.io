'use client';

import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Pill,
  PillsInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { Check, Code, Globe, LineChart, Palette, Plus, Server, Users } from 'lucide-react';
import { useState } from 'react';

// Mock data for roles
const availableRoles = [
  { id: 'frontend', name: 'Frontend Developer', icon: <Code size={16} /> },
  { id: 'backend', name: 'Backend Developer', icon: <Server size={16} /> },
  { id: 'fullstack', name: 'Full Stack Developer', icon: <Code size={16} /> },
  { id: 'designer', name: 'UI/UX Designer', icon: <Palette size={16} /> },
  { id: 'pm', name: 'Project Manager', icon: <Users size={16} /> },
  { id: 'devops', name: 'DevOps Engineer', icon: <Globe size={16} /> },
  { id: 'data', name: 'Data Scientist', icon: <LineChart size={16} /> },
  { id: 'qa', name: 'QA Engineer', icon: <Check size={16} /> },
];

// Mock data for technologies
const technologies = {
  frontend: ['React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'Go', 'PHP', 'Express', 'Django', 'Spring Boot', 'ASP.NET'],
  database: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'DynamoDB', 'Cassandra'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Terraform', 'Jenkins', 'GitHub Actions'],
  design: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'UI Design', 'UX Research', 'Prototyping'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
  other: ['GraphQL', 'REST API', 'WebSockets', 'Microservices', 'Agile', 'Scrum', 'Git'],
};

// Mock data for languages
const languagesData = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Portuguese'];

type SkillsRolesProps = {
  initialData: {
    selectedRoles: string[];
    selectedTech: string[];
    languages: { name: string; level: string }[];
  };
  onNext: (data: any) => void;
  onBack: () => void;
  preselectedRole?: string | null;
};

export default function SkillsRolesStep({ initialData, onNext, onBack, preselectedRole }: SkillsRolesProps) {
  const theme = useMantineTheme();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialData.selectedRoles);
  const [selectedTech, setSelectedTech] = useState<string[]>(initialData.selectedTech);
  const [techInput, setTechInput] = useState('');
  const [languages, setLanguages] = useState<{ name: string; level: string }[]>(initialData.languages);
  const [languageInput, setLanguageInput] = useState('');
  const [languageLevel, setLanguageLevel] = useState('basic');

  // Handle role selection
  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prev => (prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]));
  };

  // Handle tech skills
  const handleAddTech = (tech: string) => {
    if (tech && !selectedTech.includes(tech)) {
      setSelectedTech([...selectedTech, tech]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTech(selectedTech.filter(t => t !== tech));
  };

  // Handle languages
  const handleAddLanguage = (lang: string, level: string = languageLevel) => {
    if (lang && !languages.some(l => l.name === lang)) {
      setLanguages([...languages, { name: lang, level }]);
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (languageName: string) => {
    setLanguages(languages.filter(l => l.name !== languageName));
  };

  const handleContinue = () => {
    onNext({
      selectedRoles,
      selectedTech,
      languages,
    });
  };

  return (
    <Box p="md">
      <Stack spacing="xl">
        <Box>
          <Text fw={600} mb="md">
            What roles are you interested in?
          </Text>
          <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {availableRoles.map(role => (
              <UnstyledButton
                key={role.id}
                onClick={() => handleRoleToggle(role.id)}
                style={{
                  border: `1px solid ${selectedRoles.includes(role.id) ? theme.colors.blue[5] : theme.colors.gray[3]}`,
                  borderRadius: theme.radius.md,
                  padding: theme.spacing.md,
                  backgroundColor: selectedRoles.includes(role.id) ? theme.colors.blue[0] : 'transparent',
                }}
              >
                <Group>
                  <Box
                    style={{
                      backgroundColor: selectedRoles.includes(role.id) ? theme.colors.blue[5] : theme.colors.gray[1],
                      color: selectedRoles.includes(role.id) ? 'white' : theme.colors.gray[7],
                      padding: '8px',
                      borderRadius: theme.radius.sm,
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Text fw={500}>{role.name}</Text>
                  {selectedRoles.includes(role.id) && (
                    <Check size={16} color={theme.colors.blue[5]} style={{ marginLeft: 'auto' }} />
                  )}
                </Group>
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Text fw={600} mb="md">
            Technical Skills
          </Text>
          <PillsInput>
            <Pill.Group>
              {selectedTech.map(tech => (
                <Pill key={tech} withRemoveButton onRemove={() => handleRemoveTech(tech)}>
                  {tech}
                </Pill>
              ))}
            </Pill.Group>

            <PillsInput.Field
              placeholder="Add a skill..."
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && techInput) {
                  e.preventDefault();
                  handleAddTech(techInput);
                }
              }}
            />
          </PillsInput>

          <Box mt="md">
            <Text size="sm" fw={500} mb="xs">
              Popular skills
            </Text>
            <Group spacing="xs">
              {Object.entries(technologies)
                .slice(0, 3)
                .flatMap(([category, techs]) =>
                  techs.slice(0, 3).map(tech => (
                    <Badge
                      key={tech}
                      variant="outline"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleAddTech(tech)}
                    >
                      +
                      {' '}
                      {tech}
                    </Badge>
                  )),
                )}
            </Group>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Text fw={600} mb="md">
            Languages (Optional)
          </Text>
          <Group align="flex-start" spacing="xs" mb="md">
            <PillsInput style={{ flex: 1 }}>
              <Pill.Group>
                {languages.map(lang => (
                  <Pill key={lang.name} withRemoveButton onRemove={() => handleRemoveLanguage(lang.name)}>
                    {lang.name}
                    {' '}
                    (
                    {lang.level}
                    )
                  </Pill>
                ))}
              </Pill.Group>

              <PillsInput.Field
                placeholder="Add a language..."
                value={languageInput}
                onChange={e => setLanguageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && languageInput) {
                    e.preventDefault();
                    handleAddLanguage(languageInput);
                  }
                }}
              />
            </PillsInput>

            <Select
              data={[
                { value: 'basic', label: 'Basic' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'fluent', label: 'Fluent' },
                { value: 'native', label: 'Native' },
              ]}
              value={languageLevel}
              onChange={value => value && setLanguageLevel(value)}
              style={{ width: '140px' }}
            />

            <Button variant="default" onClick={() => handleAddLanguage(languageInput)} disabled={!languageInput}>
              <Plus size={16} />
            </Button>
          </Group>

          <Box mt="md">
            <Text size="sm" fw={500} mb="xs">
              Popular languages
            </Text>
            <Group spacing="xs">
              {languagesData.slice(0, 6).map(lang => (
                <Badge
                  key={lang}
                  variant="outline"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleAddLanguage(lang)}
                >
                  +
                  {' '}
                  {lang}
                </Badge>
              ))}
            </Group>
          </Box>
        </Box>

        <Group position="apart" mt="xl">
          <Button variant="subtle" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </Group>
      </Stack>
    </Box>
  );
}

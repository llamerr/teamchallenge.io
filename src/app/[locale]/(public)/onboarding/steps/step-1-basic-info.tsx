'use client';

import { Avatar, Box, Button, Divider, Group, Stack, Textarea, TextInput } from '@mantine/core';
import { Github, Globe, Linkedin, Mail, MapPin, Twitter, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type BasicInfoProps = {
  initialData: {
    name: string;
    email: string;
    title: string;
    location: string;
    bio: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    avatar: string;
  };
  onNext: (data: any) => void;
};

export default function BasicInfoStep({ initialData, onNext }: BasicInfoProps) {
  const [userData, setUserData] = useState(initialData);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    onNext(userData);
  };

  return (
    <Box p="md">
      <Stack spacing="xl">
        <Group align="center">
          <Box style={{ textAlign: 'center' }}>
            <Avatar src={userData.avatar} alt={userData.name} size={100} radius={100} mx="auto" mb="md" />
            <Button variant="outline" size="xs" leftIcon={<Upload size={14} />}>
              Change Photo
            </Button>
          </Box>
        </Group>

        <Group grow align="flex-start">
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            value={userData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            required
          />

          <TextInput
            label="Email"
            placeholder="Your email address"
            value={userData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            disabled
            description="Email is provided by your authentication provider"
            leftSection={<Mail size={16} />}
          />
        </Group>

        <Group grow align="flex-start">
          <TextInput
            label="Professional Title"
            placeholder="e.g., Full Stack Developer"
            value={userData.title}
            onChange={e => handleInputChange('title', e.target.value)}
          />

          <TextInput
            label="Location"
            placeholder="City, Country"
            value={userData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            leftSection={<MapPin size={16} />}
          />
        </Group>

        <Textarea
          label="Bio"
          placeholder="Tell us a bit about yourself, your experience, and what you're looking for"
          value={userData.bio}
          onChange={e => handleInputChange('bio', e.target.value)}
          minRows={4}
        />

        <Divider label="Social Links (Optional)" labelPosition="center" />

        <Group grow align="flex-start">
          <TextInput
            label="GitHub"
            placeholder="username"
            value={userData.github}
            onChange={e => handleInputChange('github', e.target.value)}
            leftSection={<Github size={16} />}
          />

          <TextInput
            label="LinkedIn"
            placeholder="username"
            value={userData.linkedin}
            onChange={e => handleInputChange('linkedin', e.target.value)}
            leftSection={<Linkedin size={16} />}
          />
        </Group>

        <Group grow align="flex-start">
          <TextInput
            label="Twitter"
            placeholder="username"
            value={userData.twitter}
            onChange={e => handleInputChange('twitter', e.target.value)}
            leftSection={<Twitter size={16} />}
          />

          <TextInput
            label="Personal Website"
            placeholder="https://yourwebsite.com"
            value={userData.website}
            onChange={e => handleInputChange('website', e.target.value)}
            leftSection={<Globe size={16} />}
          />
        </Group>

        <Group position="apart" mt="xl">
          <Button variant="subtle" component={Link} href="/">
            Skip for now
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </Group>
      </Stack>
    </Box>
  );
}

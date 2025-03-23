'use client';

import { Box, Container, createTheme, Stepper, Text, Title } from '@mantine/core';
import { Briefcase, Check, Code, Globe, LineChart, Palette, Server, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// Import step components
import BasicInfoStep from './steps/step-1-basic-info';

import SkillsRolesStep from './steps/step-2-skills-roles';
import ProjectsStep from './steps/step-3-projects';
import '@mantine/core/styles.css';

// Create a theme
const theme = createTheme({
  primaryColor: 'blue',
});

// Mock data for roles
const availableRoles = [
  { id: 'frontend', name: 'Frontend Developer', icon: <Code size={16} /> },
  { id: 'backend', name: 'Backend Developer', icon: <Server size={16} /> },
  { id: 'fullstack', name: 'Full Stack Developer', icon: <Code size={16} /> },
  { id: 'designer', name: 'UI/UX Designer', icon: <Palette size={16} /> },
  { id: 'pm', name: 'Project Manager', icon: <Briefcase size={16} /> },
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

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const preselectedRole = searchParams.get('role');

  // Mock user data that would come from auth provider
  const authUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=200&width=200',
  };

  const [active, setActive] = useState(0);

  // User data state
  const [userData, setUserData] = useState({
    // Basic info
    name: authUserData.name,
    email: authUserData.email,
    title: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    avatar: authUserData.avatar,

    // Skills & roles
    selectedRoles: [] as string[],
    selectedTech: [] as string[],
    languages: [] as { name: string; level: string }[],

    // Projects
    interestedProjects: [] as string[],
    appliedProjects: [] as string[],
  });

  // Set pre-selected role from URL parameter
  useEffect(() => {
    if (preselectedRole) {
      setUserData(prev => ({
        ...prev,
        selectedRoles: [preselectedRole],
        title: getDefaultTitleFromRole(preselectedRole),
      }));
    }
  }, [preselectedRole]);

  // Helper to get default title based on role
  const getDefaultTitleFromRole = (roleId: string) => {
    const roleNames = {
      frontend: 'Frontend Developer',
      backend: 'Backend Developer',
      fullstack: 'Full Stack Developer',
      designer: 'UI/UX Designer',
      pm: 'Project Manager',
      devops: 'DevOps Engineer',
      data: 'Data Scientist',
      qa: 'QA Engineer',
    };
    return roleNames[roleId] || '';
  };

  // Handle step transitions
  const handleNextStep = (stepData: any) => {
    // Update user data with the data from the current step
    setUserData(prev => ({
      ...prev,
      ...stepData,
    }));
    setActive(current => current + 1);
  };

  const handlePreviousStep = () => {
    setActive(current => current - 1);
  };

  const handleComplete = () => {
    // Here you would typically save the complete profile data
    console.log('Profile completed:', userData);
    // Navigation to dashboard is handled in the ProjectsStep component
  };

  // Force a re-render to ensure styles are applied
  useEffect(() => {
    document.body.style.colorScheme = 'light';
    return () => {
      document.body.style.colorScheme = '';
    };
  }, []);

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xs">
        Complete Your Profile
      </Title>
      <Text c="dimmed" mb="xl">
        Let's set up your profile to help you find the perfect projects
      </Text>

      <Stepper active={active} onStepClick={setActive} mb="xl">
        <Stepper.Step label="Basic Info" description="Personal information" icon={<Users size={18} />} />
        <Stepper.Step label="Skills & Roles" description="Your expertise" icon={<Code size={18} />} />
        <Stepper.Step label="Find Projects" description="Join or create projects" icon={<Briefcase size={18} />} />
      </Stepper>

      <Box py="md" px="xl" style={{ border: '1px solid #e9ecef', borderRadius: '8px' }}>
        {active === 0 && (
          <BasicInfoStep
            initialData={{
              name: userData.name,
              email: userData.email,
              title: userData.title,
              location: userData.location,
              bio: userData.bio,
              github: userData.github,
              linkedin: userData.linkedin,
              twitter: userData.twitter,
              website: userData.website,
              avatar: userData.avatar,
            }}
            onNext={handleNextStep}
          />
        )}

        {active === 1 && (
          <SkillsRolesStep
            initialData={{
              selectedRoles: userData.selectedRoles,
              selectedTech: userData.selectedTech,
              languages: userData.languages,
            }}
            preselectedRole={preselectedRole}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}

        {active === 2 && (
          <ProjectsStep
            userData={{
              selectedRoles: userData.selectedRoles,
              selectedTech: userData.selectedTech,
            }}
            onComplete={handleComplete}
            onBack={handlePreviousStep}
          />
        )}
      </Box>
    </Container>
  );
}

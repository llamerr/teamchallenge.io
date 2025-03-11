import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Check, Code, LineChart, Palette, Server, Users } from 'lucide-react';
import Link from 'next/link';

// Role cards for quick onboarding
const quickJoinRoles = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Build user interfaces and create engaging user experiences',
    icon: <Code className="h-6 w-6" />,
    skills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Develop server-side logic and integrate with databases',
    icon: <Server className="h-6 w-6" />,
    skills: ['Node.js', 'Python', 'Java', 'Databases'],
  },
  {
    id: 'designer',
    title: 'UI/UX Designer',
    description: 'Create beautiful designs and intuitive user experiences',
    icon: <Palette className="h-6 w-6" />,
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
  },
  {
    id: 'pm',
    title: 'Project Manager',
    description: 'Lead teams and ensure successful project delivery',
    icon: <Briefcase className="h-6 w-6" />,
    skills: ['Agile', 'Scrum', 'Team Leadership', 'Planning'],
  },
  {
    id: 'data',
    title: 'Data Scientist',
    description: 'Analyze data and build machine learning models',
    icon: <LineChart className="h-6 w-6" />,
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
  },
  {
    id: 'qa',
    title: 'QA Engineer',
    description: 'Ensure software quality through testing and automation',
    icon: <Check className="h-6 w-6" />,
    skills: ['Testing', 'Automation', 'Quality Assurance', 'Bug Tracking'],
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to DevArtifacts</h1>
        <p className="text-xl mb-8">A platform for organizing and sharing project artifacts for novice developers.</p>
        <div className="flex gap-4 justify-center mb-8">
          <Button asChild>
            <Link href="/artifacts">Browse Artifacts</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </div>

      <div className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your role to get started with a personalized onboarding experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickJoinRoles.map(role => (
            <Card key={role.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-md">{role.icon}</div>
                  <CardTitle>{role.title}</CardTitle>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map(skill => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/onboarding?role=${role.id}`}>
                    Join as
                    {' '}
                    {role.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/onboarding">
              <Users className="mr-2 h-4 w-4" />
              Join with a custom role
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-t pt-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Find the Perfect Project</h2>
            <p className="text-muted-foreground mb-6">
              Browse through a variety of projects that match your skills and interests. Collaborate with other
              developers and build your portfolio.
            </p>
            <Button asChild>
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Share Your Knowledge</h2>
            <p className="text-muted-foreground mb-6">
              Create and share artifacts like database schemas, UI designs, and documentation. Help others learn and
              grow while showcasing your expertise.
            </p>
            <Button asChild>
              <Link href="/artifacts">Browse Artifacts</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

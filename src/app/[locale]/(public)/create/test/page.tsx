import { db } from '@/libs/DB';
import CreateTestForm from './client';

// License options
const licenses = [
  { value: 'mit', label: 'MIT License' },
  { value: 'apache', label: 'Apache License 2.0' },
  { value: 'gpl', label: 'GNU GPL v3' },
  { value: 'bsd', label: 'BSD License' },
  { value: 'cc0', label: 'Creative Commons Zero v1.0' },
];

// Fetch categories from database
async function fetchCategories() {
  try {
    const categories = await db.query.artifactCategoriesTable.findMany();

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch projects from database
async function fetchProjects() {
  try {
    const projects = await db.query.projectsTable.findMany({
      limit: 5,
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function CreateTestPage() {
  const categories = await fetchCategories();
  const projects = await fetchProjects();

  return (
    <CreateTestForm projects={projects} licenses={licenses} categories={categories} />
  );
}

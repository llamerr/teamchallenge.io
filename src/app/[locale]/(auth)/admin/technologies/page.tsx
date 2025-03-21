import { db } from '@/libs/DB';
import { TechnologiesManager } from './TechnologiesManager';

// Fetch projects from database
async function fetchTechnologies() {
  try {
    const technologies = await db.query.technologiesTable.findMany();

    return technologies;
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
}

export default async function TechnologiesPage() {
  const technologies = await fetchTechnologies();

  return (
    <TechnologiesManager technologies={technologies} />
  );
}

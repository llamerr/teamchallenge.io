import { db } from '@/libs/DB';
import { CategoriesManager } from './CategoriesManager';

// Fetch projects from database
async function fetchArtifactCategories() {
  try {
    const tags = await db.query.artifactCategoriesTable.findMany();

    return tags;
  } catch (error) {
    console.error('Error fetching artifact tags:', error);
    return [];
  }
}

export default async function TagsPage() {
  const categories = await fetchArtifactCategories();

  return (
    <CategoriesManager categories={categories} />
  );
}

import { db } from '@/libs/DB';
import { TagsManager } from './TagsManager';

// Fetch projects from database
async function fetchArtifactTags() {
  try {
    const tags = await db.query.artifactTagsTable.findMany();

    return tags;
  } catch (error) {
    console.error('Error fetching artifact tags:', error);
    return [];
  }
}

export default async function TagsPage() {
  const tags = await fetchArtifactTags();

  return (
    <TagsManager tags={tags} />
  );
}

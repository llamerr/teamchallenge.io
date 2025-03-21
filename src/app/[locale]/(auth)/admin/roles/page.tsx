import { db } from '@/libs/DB';
import { RolesManager } from './RolesManager';

// Fetch projects from database
async function fetchRoles() {
  try {
    const roles = await db.query.rolesTable.findMany();

    return roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

export default async function RolesPage() {
  const roles = await fetchRoles();

  return (
    <RolesManager roles={roles} />
  );
}

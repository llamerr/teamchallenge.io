'use server';

import { db } from '@/libs/DB';
import { projectLearningOutcomesTable, projectsTable } from '@/models/projects';
import { teamsTable } from '@/models/teams';
import { eq } from 'drizzle-orm';

export type StartProjectActionState = {
  projectId: number;
  name?: string;
  teamId?: number;
  errors?: {
    projectId?: string[];
    name?: string[];
  };
};

export async function startProject(
  _prevState: Partial<StartProjectActionState>,
  form: FormData,
): Promise<Partial<StartProjectActionState>> {
  const projectId = Number.parseInt(form.get('projectId') as string);
  const name = form.get('name') as string;

  if (Number.isNaN(projectId)) {
    return {
      errors: {
        projectId: ['Invalid project ID'],
      },
    };
  }

  try {
    // Start transaction
    const [team] = await db.transaction(async (tx) => {
      // Get the source project
      const [sourceProject] = await tx
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.id, projectId));

      if (!sourceProject) {
        throw new Error('Source project not found');
      }

      // Create new team with project data
      const [newTeam] = await tx
        .insert(teamsTable)
        .values({
          name,
          projectId,
          title: sourceProject.title,
          description: sourceProject.description,
          longDescription: sourceProject.longDescription,
          progress: 0,
          startDate: new Date().toISOString(),
          status: 'active',
        })
        .returning();

      if (!newTeam) {
        throw new Error('Failed to create team');
      }

      // Copy learning outcomes
      const learningOutcomes = await tx
        .select()
        .from(projectLearningOutcomesTable)
        .where(eq(projectLearningOutcomesTable.projectId, projectId));

      if (learningOutcomes.length > 0) {
        const insertOutcomes = learningOutcomes.map(outcome => ({
          teamId: newTeam.id,
          outcome: outcome.outcome,
        }));

        await tx.insert(projectLearningOutcomesTable).values(insertOutcomes);
      }

      return [newTeam];
    });

    // Redirect to team details page
    return { projectId, name, teamId: team.id };
  } catch (error) {
    console.error('Error starting project:', error);
    return {
      errors: {
        projectId: ['Failed to start project'],
      },
    };
  }
}

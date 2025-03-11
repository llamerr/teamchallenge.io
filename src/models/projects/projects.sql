CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "project_id" integer
);

CREATE TABLE "project_categories" (
  "id" SERIAL PRIMARY KEY,
  "slug" varchar(50) UNIQUE,
  "name" varchar(100),
  "description" text,
  "icon" varchar(50)
);

CREATE TABLE "technologies" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) UNIQUE,
  "category" varchar(50)
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "description" text,
  "long_description" text,
  "category_id" integer,
  "complexity" varchar(20),
  "longevity" varchar(20),
  "duration" varchar(50),
  "team_size" integer,
  "progress" integer,
  "stars" integer DEFAULT 0,
  "forks" integer DEFAULT 0,
  "last_updated" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "repository_url" varchar(500),
  "demo_url" varchar(500)
);

CREATE TABLE "projects_to_technologies" (
  "project_id" integer,
  "technology_id" integer,
  "primary" boolean DEFAULT false
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) UNIQUE,
  "description" text,
  "typical_skills" text[],
  "default_count" integer DEFAULT 1
);

CREATE TABLE "projects_to_roles" (
  "id" SERIAL PRIMARY KEY,
  "project_id" integer,
  "role_id" integer,
  "count" integer,
  "specific_skills" text[]
);

CREATE TABLE "project_learning_outcomes" (
  "id" SERIAL PRIMARY KEY,
  "project_id" integer,
  "outcome" text
);

CREATE TABLE "artifacts" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "artifacts_to_projects" (
  "artifact_id" integer,
  "project_id" integer,
  "added_at" timestamp DEFAULT (now())
);

ALTER TABLE "teams" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "projects" ADD FOREIGN KEY ("category_id") REFERENCES "project_categories" ("id");

ALTER TABLE "projects_to_technologies" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "projects_to_technologies" ADD FOREIGN KEY ("technology_id") REFERENCES "technologies" ("id");

ALTER TABLE "projects_to_roles" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "projects_to_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "project_learning_outcomes" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "artifacts_to_projects" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts_to_projects" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "artifact_categories" (
  "id" SERIAL PRIMARY KEY,
  "slug" varchar(50) UNIQUE,
  "name" varchar(100),
  "description" text,
  "icon" varchar(50)
);

CREATE TABLE "artifacts" (
  "id" SERIAL PRIMARY KEY,
  "root_artifact_id" integer,
  "parent_version_id" integer,
  "title" varchar(255) NOT NULL,
  "description" text,
  "category_id" integer,
  "author_id" integer,
  "file_size" bigint,
  "file_path" varchar(500),
  "date_created" timestamp DEFAULT (now()),
  "last_updated" timestamp DEFAULT (now()),
  "downloads" integer DEFAULT 0,
  "views" integer DEFAULT 0,
  "license" varchar(50),
  "version_number" varchar(50) NOT NULL,
  "version_type" varchar(20),
  "is_current" boolean DEFAULT false,
  "status" varchar(20)
);

CREATE TABLE "artifacts_to_projects" (
  "artifact_id" integer,
  "project_id" integer,
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "artifacts_to_teams" (
  "artifact_id" integer,
  "team_id" integer,
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "artifact_tags" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE,
  "description" text
);

CREATE TABLE "artifacts_to_artifact_tags" (
  "artifact_id" integer,
  "artifact_tag_id" integer,
  "added_at" timestamp DEFAULT (now())
);

ALTER TABLE "artifacts" ADD FOREIGN KEY ("root_artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("parent_version_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("category_id") REFERENCES "artifact_categories" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "artifacts_to_projects" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts_to_projects" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "artifacts_to_teams" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts_to_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "artifacts_to_artifact_tags" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts_to_artifact_tags" ADD FOREIGN KEY ("artifact_tag_id") REFERENCES "artifact_tags" ("id");

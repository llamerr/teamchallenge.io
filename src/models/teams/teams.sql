CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) UNIQUE,
  "project_id" integer,
  "title" varchar(255) NOT NULL,
  "description" text,
  "long_description" text,
  "progress" integer,
  "start_date" date,
  "status" varchar(50)
);

CREATE TABLE "users_to_teams" (
  "user_id" integer,
  "team_id" integer,
  "role" varchar(50),
  "join_date" date,
  "status" varchar(50),
  PRIMARY KEY ("user_id", "team_id", "role")
);

CREATE TABLE "teams_to_languages" (
  "team_id" integer,
  "language_id" integer,
  PRIMARY KEY ("team_id", "language_id")
);

CREATE TABLE "recent_activities" (
  "id" SERIAL PRIMARY KEY,
  "team_id" integer,
  "type" varchar(50),
  "user" varchar(100),
  "action" text,
  "date" timestamp,
  "details" text
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "artifacts" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "artifacts_to_teams" (
  "artifact_id" integer,
  "team_id" integer,
  "added_at" timestamp DEFAULT (now()),
  PRIMARY KEY ("artifact_id", "team_id")
);

CREATE TABLE "languages" (
  "id" SERIAL PRIMARY KEY
);

ALTER TABLE "teams" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "users_to_teams" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users_to_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "teams_to_languages" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "teams_to_languages" ADD FOREIGN KEY ("language_id") REFERENCES "languages" ("id");

ALTER TABLE "recent_activities" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "artifacts_to_teams" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts_to_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

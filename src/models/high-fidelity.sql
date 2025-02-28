CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "project_id" integer
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

CREATE TABLE "artifact_version_changes" (
  "id" SERIAL PRIMARY KEY,
  "artifact_id" integer,
  "user_id" integer,
  "change_type" varchar(50),
  "old_value" text,
  "new_value" text,
  "changed_at" timestamp DEFAULT (now()),
  "change_description" text
);

CREATE TABLE "news" (
  "id" SERIAL PRIMARY KEY
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "news_id" integer
);

CREATE TABLE "u_to_t" (
  "user_id" integer,
  "team_id" integer
);

CREATE TABLE "a_to_p" (
  "artifact_id" integer,
  "project_id" integer,
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "a_to_t" (
  "artifact_id" integer,
  "team_id" integer,
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "artifact_tags" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE,
  "description" text
);

CREATE TABLE "a_to_tags" (
  "artifact_id" integer,
  "tag_id" integer,
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "n_to_u" (
  "notification_id" integer,
  "user_id" integer
);

ALTER TABLE "teams" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("root_artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("parent_version_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("category_id") REFERENCES "artifact_categories" ("id");

ALTER TABLE "artifacts" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "artifact_version_changes" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "artifact_version_changes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");

ALTER TABLE "u_to_t" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "u_to_t" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "a_to_p" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "a_to_p" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "a_to_t" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "a_to_t" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "a_to_tags" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "a_to_tags" ADD FOREIGN KEY ("tag_id") REFERENCES "artifact_tags" ("id");

ALTER TABLE "n_to_u" ADD FOREIGN KEY ("notification_id") REFERENCES "notifications" ("id");

ALTER TABLE "n_to_u" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

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

CREATE TABLE "artifacts" (
  "id" SERIAL PRIMARY KEY
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
  "project_id" integer
);

CREATE TABLE "a_to_t" (
  "artifact_id" integer,
  "team_id" integer
);

CREATE TABLE "n_to_u" (
  "notification_id" integer,
  "user_id" integer
);

ALTER TABLE "teams" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");

ALTER TABLE "u_to_t" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "u_to_t" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "a_to_p" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "a_to_p" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "a_to_t" ADD FOREIGN KEY ("artifact_id") REFERENCES "artifacts" ("id");

ALTER TABLE "a_to_t" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "n_to_u" ADD FOREIGN KEY ("notification_id") REFERENCES "notifications" ("id");

ALTER TABLE "n_to_u" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

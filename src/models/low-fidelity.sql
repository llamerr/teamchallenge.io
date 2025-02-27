CREATE TABLE "users" (
  "id" uuid PRIMARY KEY
);

CREATE TABLE "teams" (
  "id" uuid PRIMARY KEY,
  "project_id" uuid
);

CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY
);

CREATE TABLE "artifacts" (
  "id" uuid PRIMARY KEY
);

CREATE TABLE "news" (
  "id" uuid PRIMARY KEY
);

CREATE TABLE "notifications" (
  "id" uuid PRIMARY KEY,
  "news_id" uuid
);

CREATE TABLE "u_to_t" (
  "user_id" uuid,
  "team_id" uuid
);

CREATE TABLE "a_to_p" (
  "artifact_id" uuid,
  "project_id" uuid
);

CREATE TABLE "a_to_t" (
  "artifact_id" uuid,
  "team_id" uuid
);

CREATE TABLE "n_to_u" (
  "notification_id" uuid,
  "user_id" uuid
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

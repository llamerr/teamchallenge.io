CREATE TABLE "artifacts_to_projects" (
	"artifact_id" integer,
	"project_id" integer,
	"added_at" timestamp DEFAULT now(),
	CONSTRAINT "artifacts_to_projects_artifact_id_project_id_pk" PRIMARY KEY("artifact_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "artifacts_to_teams" (
	"artifact_id" integer,
	"team_id" integer,
	"added_at" timestamp DEFAULT now(),
	CONSTRAINT "artifacts_to_teams_artifact_id_team_id_pk" PRIMARY KEY("artifact_id","team_id")
);
--> statement-breakpoint
CREATE TABLE "counter" (
	"id" serial PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications_to_users" (
	"notification_id" integer,
	"user_id" integer,
	CONSTRAINT "notifications_to_users_notification_id_user_id_pk" PRIMARY KEY("notification_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "projects_to_roles" (
	"project_id" integer,
	"role_id" integer,
	"count" integer,
	"specific_skills" text[],
	CONSTRAINT "projects_to_roles_project_id_role_id_pk" PRIMARY KEY("project_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "projects_to_technologies" (
	"project_id" integer,
	"technology_id" integer,
	"primary" boolean DEFAULT false,
	CONSTRAINT "projects_to_technologies_project_id_technology_id_pk" PRIMARY KEY("project_id","technology_id")
);
--> statement-breakpoint
CREATE TABLE "teams_to_languages" (
	"team_id" integer,
	"language_id" integer
);
--> statement-breakpoint
CREATE TABLE "users_to_languages" (
	"user_id" integer,
	"language_id" integer,
	"proficiency_level" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "users_to_roles" (
	"user_id" integer,
	"role_id" integer,
	CONSTRAINT "users_to_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "users_to_teams" (
	"user_id" integer,
	"team_id" integer,
	"role" varchar(50),
	"join_date" date,
	"status" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "users_to_technologies" (
	"user_id" integer,
	"technology_id" integer,
	CONSTRAINT "users_to_technologies_user_id_technology_id_pk" PRIMARY KEY("user_id","technology_id")
);
--> statement-breakpoint
CREATE TABLE "artifact_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(50),
	"name" varchar(100),
	"description" text,
	"icon" varchar(50),
	CONSTRAINT "artifact_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "artifact_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"description" text,
	CONSTRAINT "artifact_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "artifacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"root_artifact_id" integer,
	"parent_version_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category_id" integer,
	"author_id" integer,
	"file_size" bigint,
	"file_path" varchar(500),
	"date_created" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now(),
	"downloads" integer DEFAULT 0,
	"views" integer DEFAULT 0,
	"license" varchar(50),
	"version_number" varchar(50) NOT NULL,
	"version_type" varchar(20),
	"is_current" boolean DEFAULT false,
	"status" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "artifacts_to_artifact_tags" (
	"artifact_id" integer,
	"artifact_tag_id" integer,
	"added_at" timestamp DEFAULT now(),
	CONSTRAINT "artifacts_to_artifact_tags_artifact_id_artifact_tag_id_pk" PRIMARY KEY("artifact_id","artifact_tag_id")
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"news_id" integer
);
--> statement-breakpoint
CREATE TABLE "project_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(50),
	"name" varchar(100),
	"description" text,
	"icon" varchar(50),
	CONSTRAINT "project_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_learning_outcomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"outcome" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
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
	"created_at" timestamp DEFAULT now(),
	"repository_url" varchar(500),
	"demo_url" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"description" text,
	"typical_skills" text[],
	"default_count" integer DEFAULT 1,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "recent_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer,
	"type" varchar(50),
	"user" varchar(100),
	"action" text,
	"date" timestamp,
	"details" text
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"project_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"long_description" text,
	"progress" integer,
	"start_date" date,
	"status" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "technologies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"category" varchar(50),
	CONSTRAINT "technologies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "project_stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(255),
	"avatar_url" varchar(500),
	"location" varchar(255),
	"about" text,
	"github_username" varchar(100),
	"linkedin_username" varchar(100),
	"twitter_username" varchar(100),
	"website_url" varchar(500),
	"availability_status" varchar(50),
	"availability_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"projects_completed" integer DEFAULT 0,
	"teams_led" integer DEFAULT 0,
	"artifacts_created" integer DEFAULT 0,
	"contributions" integer DEFAULT 0,
	"rating" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_to_stages" (
	"user_id" integer,
	"stage_id" integer,
	CONSTRAINT "users_to_stages_user_id_stage_id_pk" PRIMARY KEY("user_id","stage_id")
);
--> statement-breakpoint
ALTER TABLE "artifacts_to_projects" ADD CONSTRAINT "artifacts_to_projects_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_to_projects" ADD CONSTRAINT "artifacts_to_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_to_teams" ADD CONSTRAINT "artifacts_to_teams_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_to_teams" ADD CONSTRAINT "artifacts_to_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_to_users" ADD CONSTRAINT "notifications_to_users_notification_id_notifications_id_fk" FOREIGN KEY ("notification_id") REFERENCES "public"."notifications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_to_users" ADD CONSTRAINT "notifications_to_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_roles" ADD CONSTRAINT "projects_to_roles_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_roles" ADD CONSTRAINT "projects_to_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_technologies" ADD CONSTRAINT "projects_to_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_to_technologies" ADD CONSTRAINT "projects_to_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams_to_languages" ADD CONSTRAINT "teams_to_languages_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams_to_languages" ADD CONSTRAINT "teams_to_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_languages" ADD CONSTRAINT "users_to_languages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_languages" ADD CONSTRAINT "users_to_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_teams" ADD CONSTRAINT "users_to_teams_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_teams" ADD CONSTRAINT "users_to_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_technologies" ADD CONSTRAINT "users_to_technologies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_technologies" ADD CONSTRAINT "users_to_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_root_artifact_id_artifacts_id_fk" FOREIGN KEY ("root_artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_parent_version_id_artifacts_id_fk" FOREIGN KEY ("parent_version_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_category_id_artifact_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."artifact_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts" ADD CONSTRAINT "artifacts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_to_artifact_tags" ADD CONSTRAINT "artifacts_to_artifact_tags_artifact_id_artifacts_id_fk" FOREIGN KEY ("artifact_id") REFERENCES "public"."artifacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artifacts_to_artifact_tags" ADD CONSTRAINT "artifacts_to_artifact_tags_artifact_tag_id_artifact_tags_id_fk" FOREIGN KEY ("artifact_tag_id") REFERENCES "public"."artifact_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_learning_outcomes" ADD CONSTRAINT "project_learning_outcomes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recent_activities" ADD CONSTRAINT "recent_activities_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_stages" ADD CONSTRAINT "users_to_stages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_stages" ADD CONSTRAINT "users_to_stages_stage_id_project_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."project_stages"("id") ON DELETE no action ON UPDATE no action;
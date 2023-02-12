/*
    types:
        - types for the rest querries
 */

export type WorkflowType = {
  created_at: string;
  id: number;
  project_id: number;
  created_by_user: number;
  status: string;
  duration_seconds: number;
};

export type JobType = {
  created_at: string;
  duration_seconds: number;
  id: number;
  stage: string;
  status: string;
  workflow_id: number;
};

export type TraceType = {
  id: number;
  job_id: number;
  offset: number;
  size: number;
  content: string;
};

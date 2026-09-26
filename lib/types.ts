export type SkillTag =
  | "SQL"
  | "Python"
  | "Power BI"
  | "Excel"
  | "Tableau"
  | "ETL";

export type CandidateStatus = "vetted" | "in_sprint" | "completed";

export interface Candidate {
  id: string;
  codeName: string; // anonymized handle shown pre-match, e.g. "Analyst #A104"
  initials: string;
  college: string;
  year: string;
  skills: SkillTag[];
  vettingScore: number; // 0-100
  sprintsCompleted: number;
  status: CandidateStatus;
  topPercentile?: number;
}

export type SprintStatus = "open" | "filling" | "closed";

export interface MicroTask {
  id: string;
  title: string;
  companyStage: string; // blinded company descriptor
  skills: SkillTag[];
  durationDays: number;
  budgetMin: number;
  budgetMax: number;
  vettedInterested: number;
  status: SprintStatus;
}

export interface TimelineStep {
  id: string;
  number: string;
  title: string;
  body: string;
}

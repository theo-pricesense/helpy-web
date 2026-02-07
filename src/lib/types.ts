export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  memberCount?: number;
}

export interface Project {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
}

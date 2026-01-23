export type HolidayId = string;
export type ClaimId = string;
export type PolicyId = string;

export interface Holiday {
  id: string;
  date: string;
  name: string;
  region: string;
  type?: 'National' | 'Regional' | 'Company';
}


export type ClaimStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export interface Claim {
  id: ClaimId;
  type: 'Travel' | 'Medical' | 'Food' | 'Other';
  amount: number;
  status: ClaimStatus;
  submittedAt: string; // ISO
}

export interface Policy {
  id: PolicyId;
  title: string;
  category: 'HR' | 'Security' | 'IT' | 'Finance';
  updatedAt: string; // ISO
}

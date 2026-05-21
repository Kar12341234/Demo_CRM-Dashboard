import type { TranslationKey } from "@/lib/i18n";

export type StatusKey =
  | "newLead"
  | "contacted"
  | "qualified"
  | "proposal"
  | "active"
  | "atRisk"
  | "expanding";

export type StageKey =
  | "newStage"
  | "contactedStage"
  | "proposalStage"
  | "negotiationStage"
  | "wonStage"
  | "lostStage";

export type PriorityKey = "high" | "medium" | "low";
export type SourceKey = "referral" | "linkedIn" | "webForm" | "outbound";
export type SegmentKey = "enterprise" | "midMarket" | "startup";

export const metrics = [
  { label: "totalLeads" as TranslationKey, value: "3,842", delta: "+18.4%" },
  { label: "newCustomers" as TranslationKey, value: "286", delta: "+9.7%" },
  { label: "activeDeals" as TranslationKey, value: "74", delta: "+12" },
  { label: "monthlyRevenue" as TranslationKey, value: "$428K", delta: "+21.2%" },
  { label: "conversionRate" as TranslationKey, value: "27.8%", delta: "+3.1 pts" },
];

export const trend = [44, 58, 53, 76, 91, 104, 118, 137, 129, 151, 174, 188];

export const agendaItems = [
  { time: "09:30", title: "Northstar Analytics", note: "agendaPricing" as TranslationKey },
  { time: "11:00", title: "Atlas Cloud Ops", note: "agendaProposal" as TranslationKey },
  { time: "14:30", title: "Vertex Advisory", note: "agendaRenewal" as TranslationKey },
  { time: "16:00", title: "Beacon Logistics", note: "agendaProcurement" as TranslationKey },
];

export const activities = [
  "activityNegotiation" as TranslationKey,
  "activityRenewal" as TranslationKey,
  "activitySecurity" as TranslationKey,
  "activityImplementation" as TranslationKey,
];

export type Lead = {
  id: number;
  name: string;
  company: string;
  source: SourceKey;
  owner: string;
  status: StatusKey;
  value: number;
  lastContact: string;
};

export const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Elena Morgan",
    company: "Cloudway Systems",
    source: "linkedIn",
    owner: "Maya",
    status: "newLead",
    value: 42000,
    lastContact: "May 21",
  },
  {
    id: 2,
    name: "Ryan Cooper",
    company: "Summit HR",
    source: "webForm",
    owner: "Noah",
    status: "contacted",
    value: 28500,
    lastContact: "May 20",
  },
  {
    id: 3,
    name: "Sophia Lau",
    company: "Harbor Legal",
    source: "referral",
    owner: "Maya",
    status: "qualified",
    value: 64000,
    lastContact: "May 19",
  },
  {
    id: 4,
    name: "Jason Patel",
    company: "NovaPay",
    source: "outbound",
    owner: "Ethan",
    status: "proposal",
    value: 73500,
    lastContact: "May 18",
  },
];

export type Customer = {
  id: number;
  name: string;
  company: string;
  segment: SegmentKey;
  health: StatusKey;
  value: number;
  owner: string;
  renewal: string;
  lastContact: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Olivia Chen",
    company: "Northstar Analytics",
    segment: "enterprise",
    health: "expanding",
    value: 84000,
    owner: "Maya",
    renewal: "Aug 12",
    lastContact: "Today",
  },
  {
    id: 2,
    name: "Priya Shah",
    company: "Vertex Advisory",
    segment: "midMarket",
    health: "active",
    value: 37200,
    owner: "Noah",
    renewal: "Sep 04",
    lastContact: "May 16",
  },
  {
    id: 3,
    name: "Daniel Wright",
    company: "Beacon Logistics",
    segment: "enterprise",
    health: "atRisk",
    value: 68750,
    owner: "Ethan",
    renewal: "Jul 23",
    lastContact: "May 13",
  },
  {
    id: 4,
    name: "Avery Kim",
    company: "Cobalt Finance",
    segment: "startup",
    health: "expanding",
    value: 45900,
    owner: "Maya",
    renewal: "Oct 17",
    lastContact: "May 10",
  },
];

export type Deal = {
  id: number;
  account: string;
  owner: string;
  stage: StageKey;
  value: number;
  probability: number;
  closeDate: string;
};

export const initialDeals: Deal[] = [
  {
    id: 1,
    account: "Northstar Analytics",
    owner: "Maya",
    stage: "negotiationStage",
    value: 84000,
    probability: 72,
    closeDate: "Jun 14",
  },
  {
    id: 2,
    account: "Atlas Cloud Ops",
    owner: "Noah",
    stage: "proposalStage",
    value: 52500,
    probability: 58,
    closeDate: "Jun 21",
  },
  {
    id: 3,
    account: "Harbor Legal",
    owner: "Ethan",
    stage: "contactedStage",
    value: 64000,
    probability: 38,
    closeDate: "Jul 02",
  },
  {
    id: 4,
    account: "NovaPay",
    owner: "Maya",
    stage: "newStage",
    value: 73500,
    probability: 24,
    closeDate: "Jul 08",
  },
  {
    id: 5,
    account: "Vertex Advisory",
    owner: "Noah",
    stage: "wonStage",
    value: 37200,
    probability: 100,
    closeDate: "May 29",
  },
];

export const dealStages: StageKey[] = [
  "newStage",
  "contactedStage",
  "proposalStage",
  "negotiationStage",
  "wonStage",
  "lostStage",
];

export type TaskItem = {
  id: number;
  title: string;
  account: string;
  due: string;
  priority: PriorityKey;
  done: boolean;
};

export const initialTasks: TaskItem[] = [
  {
    id: 1,
    title: "Send revised proposal",
    account: "Atlas Cloud Ops",
    due: "Today 13:00",
    priority: "high",
    done: false,
  },
  {
    id: 2,
    title: "Book onboarding call",
    account: "Vertex Advisory",
    due: "Tomorrow",
    priority: "medium",
    done: false,
  },
  {
    id: 3,
    title: "Update renewal risk note",
    account: "Beacon Logistics",
    due: "May 23",
    priority: "high",
    done: true,
  },
  {
    id: 4,
    title: "Confirm procurement timeline",
    account: "Northstar Analytics",
    due: "May 24",
    priority: "low",
    done: false,
  },
];

export const leadSources: Array<{ source: SourceKey; share: number; leads: number }> = [
  { source: "referral", share: 38, leads: 1460 },
  { source: "linkedIn", share: 26, leads: 998 },
  { source: "webForm", share: 21, leads: 807 },
  { source: "outbound", share: 15, leads: 577 },
];

export const teamMembers = [
  { name: "Maya Wong", role: "admin" as TranslationKey, permission: "fullAccess" as TranslationKey },
  { name: "Noah Reed", role: "manager" as TranslationKey, permission: "editAccess" as TranslationKey },
  { name: "Ethan Park", role: "salesRep" as TranslationKey, permission: "viewAccess" as TranslationKey },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

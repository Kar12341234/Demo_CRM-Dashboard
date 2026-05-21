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

export const executiveMetrics = [
  { label: "forecast" as TranslationKey, value: "$1.18M", detail: "+$214K vs last quarter", progress: 78 },
  { label: "quotaAttainment" as TranslationKey, value: "86%", detail: "$842K booked", progress: 86 },
  { label: "pipelineCoverage" as TranslationKey, value: "3.4x", detail: "$2.8M open pipeline", progress: 68 },
  { label: "avgDealCycle" as TranslationKey, value: "31d", detail: "-4 days faster", progress: 58 },
];

export const nextBestActions = [
  { account: "Northstar Analytics", action: "Send security appendix", impact: "$84K" },
  { account: "Atlas Cloud Ops", action: "Schedule CFO alignment", impact: "$52K" },
  { account: "Beacon Logistics", action: "Escalate renewal risk", impact: "$68K" },
];

export const riskAccounts = [
  {
    account: "Beacon Logistics",
    health: 42,
    owner: "Ethan",
    reason: "No executive sponsor engaged",
    note: "Book VP-level review before renewal window.",
  },
  {
    account: "Summit HR",
    health: 55,
    owner: "Noah",
    reason: "Low product usage for 18 days",
    note: "Trigger onboarding recovery sequence.",
  },
];

export const leaderboard = [
  { name: "Maya Wong", revenue: 326000, winRate: 34, activities: 48 },
  { name: "Noah Reed", revenue: 241000, winRate: 29, activities: 42 },
  { name: "Ethan Park", revenue: 188000, winRate: 24, activities: 37 },
];

export const playbooks = [
  { name: "Enterprise security review", steps: 6, active: 14 },
  { name: "Renewal risk rescue", steps: 5, active: 8 },
  { name: "Inbound demo follow-up", steps: 4, active: 31 },
];

export const pipelineOverview = [
  { stage: "newStage" as StageKey, value: 186000, count: 124, color: "#06b6d4" },
  { stage: "contactedStage" as StageKey, value: 231000, count: 96, color: "#14b8a6" },
  { stage: "proposalStage" as StageKey, value: 348000, count: 58, color: "#2563eb" },
  { stage: "negotiationStage" as StageKey, value: 412000, count: 31, color: "#7c3aed" },
  { stage: "wonStage" as StageKey, value: 296000, count: 24, color: "#22c55e" },
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

export const leadIntelligence = [
  { company: "Cloudway Systems", score: 91, intent: "High", sequence: "Enterprise outbound" },
  { company: "Harbor Legal", score: 84, intent: "Medium", sequence: "Compliance nurture" },
  { company: "NovaPay", score: 78, intent: "High", sequence: "Finance demo follow-up" },
];

export const customerSignals = [
  { label: "productUsage" as TranslationKey, value: "74%", detail: "+12% MoM" },
  { label: "supportTickets" as TranslationKey, value: "6", detail: "2 urgent" },
  { label: "expansionPotential" as TranslationKey, value: "$128K", detail: "3 teams fit" },
];

export const dealDeskItems = [
  { account: "Northstar Analytics", quote: "sent" as TranslationKey, approval: "approved" as TranslationKey },
  { account: "Atlas Cloud Ops", quote: "legalReview" as TranslationKey, approval: "approval" as TranslationKey },
  { account: "Harbor Legal", quote: "meetingBooked" as TranslationKey, approval: "sent" as TranslationKey },
];

export const workload = [
  { label: "overdue" as TranslationKey, value: 6 },
  { label: "dueToday" as TranslationKey, value: 14 },
  { label: "upcoming" as TranslationKey, value: 28 },
  { label: "callQueue" as TranslationKey, value: 9 },
  { label: "emailFollowUps" as TranslationKey, value: 17 },
];

export const funnel = [
  { label: "newStage" as StageKey, value: 3842, width: 100 },
  { label: "contactedStage" as StageKey, value: 2140, width: 78 },
  { label: "proposalStage" as StageKey, value: 842, width: 52 },
  { label: "negotiationStage" as StageKey, value: 318, width: 34 },
  { label: "wonStage" as StageKey, value: 286, width: 28 },
];

export const segmentRevenue = [
  { label: "enterprise" as TranslationKey, value: 612000, share: 52 },
  { label: "midMarket" as TranslationKey, value: 356000, share: 30 },
  { label: "startup" as TranslationKey, value: 212000, share: 18 },
];

export const reportRows = [
  { rep: "Maya Wong", revenue: 326000, winRate: 34, velocity: "$18.2K/day" },
  { rep: "Noah Reed", revenue: 241000, winRate: 29, velocity: "$13.7K/day" },
  { rep: "Ethan Park", revenue: 188000, winRate: 24, velocity: "$10.4K/day" },
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

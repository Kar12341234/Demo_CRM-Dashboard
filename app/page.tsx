const navigationItems = [
  { label: "Dashboard", icon: "D" },
  { label: "Leads", icon: "L" },
  { label: "Customers", icon: "C" },
  { label: "Deals", icon: "P" },
  { label: "Tasks", icon: "T" },
  { label: "Reports", icon: "R" },
  { label: "Settings", icon: "S" },
];

const metrics = [
  { label: "Total Leads", value: "3,842", delta: "+18.4%", tone: "text-emerald" },
  { label: "New Customers", value: "286", delta: "+9.7%", tone: "text-accent" },
  { label: "Active Deals", value: "74", delta: "+12 this week", tone: "text-amber" },
  { label: "Monthly Revenue", value: "$428K", delta: "+21.2%", tone: "text-emerald" },
  { label: "Conversion Rate", value: "27.8%", delta: "+3.1 pts", tone: "text-accent" },
];

const pipeline = [
  { stage: "New Lead", count: 124, value: "$186K", percent: 86, color: "bg-sky-500" },
  { stage: "Contacted", count: 96, value: "$231K", percent: 72, color: "bg-cyan-500" },
  { stage: "Proposal Sent", count: 58, value: "$348K", percent: 58, color: "bg-blue-600" },
  { stage: "Negotiation", count: 31, value: "$412K", percent: 46, color: "bg-indigo-500" },
  { stage: "Won", count: 24, value: "$296K", percent: 38, color: "bg-emerald" },
  { stage: "Lost", count: 11, value: "$74K", percent: 18, color: "bg-rose-500" },
];

const customers = [
  {
    name: "Olivia Chen",
    company: "Northstar Analytics",
    status: "Enterprise",
    value: "$84,000",
    lastContact: "Today",
  },
  {
    name: "Marcus Rivera",
    company: "Atlas Cloud Ops",
    status: "Negotiation",
    value: "$52,500",
    lastContact: "May 18",
  },
  {
    name: "Priya Shah",
    company: "Vertex Advisory",
    status: "Active",
    value: "$37,200",
    lastContact: "May 16",
  },
  {
    name: "Daniel Wright",
    company: "Beacon Logistics",
    status: "Proposal",
    value: "$68,750",
    lastContact: "May 13",
  },
  {
    name: "Avery Kim",
    company: "Cobalt Finance",
    status: "Renewal",
    value: "$45,900",
    lastContact: "May 10",
  },
];

const tasks = [
  { label: "Upcoming calls", detail: "4 demos scheduled before 3:00 PM", priority: "High" },
  { label: "Follow-up reminders", detail: "Send proposal recap to Atlas Cloud Ops", priority: "Medium" },
  { label: "Priority tasks", detail: "Review enterprise pricing for Northstar", priority: "High" },
];

const revenueTrend = [42, 58, 51, 72, 86, 96, 118, 132, 126, 148, 166, 182];

const leadSources = [
  { source: "Referral", share: 38 },
  { source: "LinkedIn", share: 26 },
  { source: "Web Form", share: 21 },
  { source: "Outbound", share: 15 },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Card({
  children,
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"section">>) {
  return (
    <section className={cx("rounded-lg border border-slate-200 bg-white shadow-soft", className)} {...props}>
      {children}
    </section>
  );
}

export default function Home() {
  const maxRevenue = Math.max(...revenueTrend);

  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/86 px-5 py-4 backdrop-blur lg:sticky lg:top-0 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6">
          <div className="flex items-center justify-between lg:block">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
                  CRM
                </div>
                <div>
                  <p className="text-sm font-semibold">Nexus CRM</p>
                  <p className="text-xs text-steel">Portfolio Demo</p>
                </div>
              </div>
            </div>
            <button
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-steel lg:hidden"
              type="button"
            >
              Menu
            </button>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-9 lg:block lg:space-y-1">
            {navigationItems.map((item) => (
              <a
                className={cx(
                  "flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  item.label === "Dashboard"
                    ? "bg-ink text-white shadow-sm"
                    : "text-steel hover:bg-slate-100 hover:text-ink",
                )}
                href={`#${item.label.toLowerCase()}`}
                key={item.label}
              >
                <span
                  className={cx(
                    "grid h-7 w-7 place-items-center rounded-md text-xs font-bold",
                    item.label === "Dashboard" ? "bg-white/16 text-white" : "bg-slate-100 text-steel",
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 hidden rounded-lg border border-slate-200 bg-slate-50 p-4 lg:block">
            <p className="text-xs font-semibold uppercase text-steel">Quarter target</p>
            <p className="mt-2 text-2xl font-bold">$1.24M</p>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-full w-[68%] rounded-full bg-accent" />
            </div>
            <p className="mt-3 text-xs text-steel">$842K booked across 38 won deals</p>
          </div>
        </aside>

        <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">Sales operations dashboard</p>
              <h1 className="mt-2 text-3xl font-bold tracking-normal text-ink md:text-4xl">
                CRM Dashboard Demo
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
                Customer management, pipeline tracking, revenue analytics, and follow-up
                workflows for B2B teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm"
                type="button"
              >
                Export
              </button>
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm" type="button">
                Add Lead
              </button>
            </div>
          </header>

          <section
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
            id="dashboard"
          >
            {metrics.map((metric) => (
              <Card className="p-5" key={metric.label}>
                <p className="text-sm font-medium text-steel">{metric.label}</p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <span className={cx("text-sm font-semibold", metric.tone)}>{metric.delta}</span>
                </div>
              </Card>
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="p-5" id="deals">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold">Sales Pipeline</h2>
                  <p className="mt-1 text-sm text-steel">Weighted opportunity value by stage</p>
                </div>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-steel">
                  344 open records
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {pipeline.map((stage) => (
                  <div className="rounded-lg border border-slate-200 p-4" key={stage.stage}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{stage.stage}</p>
                        <p className="mt-1 text-sm text-steel">{stage.count} deals</p>
                      </div>
                      <p className="font-bold">{stage.value}</p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-slate-100">
                      <div className={cx("h-full rounded-full", stage.color)} style={{ width: `${stage.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5" id="tasks">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Tasks & Follow-ups</h2>
                  <p className="mt-1 text-sm text-steel">Calls, reminders, and priority work</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 font-bold text-accent">
                  9
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {tasks.map((task) => (
                  <article className="rounded-lg border border-slate-200 p-4" key={task.label}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{task.label}</p>
                      <span
                        className={cx(
                          "rounded-md px-2 py-1 text-xs font-bold",
                          task.priority === "High"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber",
                        )}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-steel">{task.detail}</p>
                  </article>
                ))}
              </div>
            </Card>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]" id="reports">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Reports</h2>
                  <p className="mt-1 text-sm text-steel">Sales chart and revenue trend</p>
                </div>
                <p className="text-sm font-semibold text-emerald">+16.8% YoY</p>
              </div>
              <div className="mt-7 flex h-56 items-end gap-2 rounded-lg bg-slate-50 p-4">
                {revenueTrend.map((value, index) => (
                  <div className="flex flex-1 flex-col items-center gap-2" key={`${value}-${index}`}>
                    <div
                      className="w-full rounded-t-md bg-accent"
                      style={{ height: `${Math.max(14, (value / maxRevenue) * 100)}%` }}
                    />
                    <span className="text-[10px] font-semibold text-steel">{index + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5" id="customers">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold">Customer Table</h2>
                  <p className="mt-1 text-sm text-steel">Account status, deal value, and last contact</p>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold" type="button">
                  View All
                </button>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase text-steel">
                      <th className="py-3 pr-4 font-bold">Customer name</th>
                      <th className="py-3 pr-4 font-bold">Company</th>
                      <th className="py-3 pr-4 font-bold">Status</th>
                      <th className="py-3 pr-4 font-bold">Deal value</th>
                      <th className="py-3 font-bold">Last contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map((customer) => (
                      <tr key={customer.name}>
                        <td className="py-4 pr-4 font-semibold">{customer.name}</td>
                        <td className="py-4 pr-4 text-steel">{customer.company}</td>
                        <td className="py-4 pr-4">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-ink">
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-4 pr-4 font-semibold">{customer.value}</td>
                        <td className="py-4 text-steel">{customer.lastContact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-4" id="leads">
            {leadSources.map((source) => (
              <Card className="p-5" key={source.source}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{source.source}</p>
                  <p className="text-2xl font-bold">{source.share}%</p>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald" style={{ width: `${source.share}%` }} />
                </div>
                <p className="mt-3 text-xs text-steel">Lead source breakdown</p>
              </Card>
            ))}
          </section>

          <section className="mt-5 rounded-lg border border-slate-200 bg-ink p-5 text-white" id="settings">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-lg font-bold">Management Platform Ready</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/72">
                  Built to demonstrate CRM modules for sales teams, consultants, SaaS founders,
                  and B2B service providers: dashboard analytics, account views, pipeline health,
                  and follow-up operations in one responsive interface.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  <p className="text-xl font-bold">99%</p>
                  <p className="text-xs text-white/68">Uptime</p>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  <p className="text-xl font-bold">24</p>
                  <p className="text-xs text-white/68">Reports</p>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  <p className="text-xl font-bold">6</p>
                  <p className="text-xs text-white/68">Roles</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

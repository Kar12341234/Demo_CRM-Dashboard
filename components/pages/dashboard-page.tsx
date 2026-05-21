"use client";

import { activities, agendaItems, leadSources, metrics, trend } from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { ArrowRightIcon, ReportsIcon } from "@/components/icons";
import { Card, LinkButton, PageHeader } from "@/components/ui";

export function DashboardPage() {
  const { t } = useCrm();
  const maxTrend = Math.max(...trend);

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <>
            <LinkButton href="/leads">
              {t("viewLeads")}
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton className="bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50" href="/reports">
              <ReportsIcon className="h-4 w-4" />
              {t("openReports")}
            </LinkButton>
          </>
        }
        subtitle={t("dashboardSubtitle")}
        title={t("dashboardTitle")}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <Card className="p-5" key={metric.label}>
            <p className="text-sm font-medium text-slate-500">{t(metric.label)}</p>
            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold tracking-normal text-slate-950">{metric.value}</p>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                {metric.delta}
              </span>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t("revenueTrend")}</h2>
              <p className="mt-1 text-sm text-slate-500">{t("dashboardTrendNote")}</p>
            </div>
            <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              2026
            </span>
          </div>
          <div className="mt-8 flex h-72 items-end gap-3 rounded-lg bg-slate-50 px-4 pb-4 pt-8">
            {trend.map((value, index) => (
              <div className="flex flex-1 flex-col items-center gap-3" key={`${value}-${index}`}>
                <div
                  className="w-full rounded-t-md bg-slate-950 shadow-[0_8px_22px_rgba(15,23,42,0.14)]"
                  style={{ height: `${Math.max(16, (value / maxTrend) * 100)}%` }}
                />
                <span className="text-xs font-semibold text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("todaysAgenda")}</h2>
          <div className="mt-5 divide-y divide-slate-100">
            {agendaItems.map((item) => (
              <div className="grid grid-cols-[64px_1fr] gap-4 py-4" key={`${item.time}-${item.title}`}>
                <span className="text-sm font-semibold text-slate-400">{item.time}</span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{t(item.note)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("pipelineHealth")}</h2>
          <div className="mt-6 space-y-4">
            {leadSources.map((source) => (
              <div key={source.source}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">{t(source.source)}</span>
                  <span className="text-slate-500">{source.share}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-950" style={{ width: `${source.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("recentActivity")}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {activities.map((activity) => (
              <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3" key={activity}>
                <p className="text-sm font-medium text-slate-700">{t(activity)}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

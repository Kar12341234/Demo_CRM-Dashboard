"use client";

import {
  activities,
  agendaItems,
  executiveMetrics,
  formatCurrency,
  leaderboard,
  nextBestActions,
  pipelineOverview,
  playbooks,
  riskAccounts,
  trend,
} from "@/lib/crm-data";
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
            <LinkButton href="/reports" variant="secondary">
              <ReportsIcon className="h-4 w-4" />
              {t("openReports")}
            </LinkButton>
          </>
        }
        subtitle={t("dashboardSubtitle")}
        title={t("dashboardTitle")}
      />

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden !border-[#07111f] !bg-[#07111f] !text-white !ring-0">
          <div className="grid gap-8 p-7 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold text-cyan-300">{t("commandCenter")}</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-normal md:text-5xl">
                {t("weightedForecast")} $1.18M
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                {t("commandCenterSubtitle")}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {nextBestActions.map((item) => (
                  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4" key={item.account}>
                    <p className="text-xs font-semibold uppercase text-slate-400">{item.account}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.action}</p>
                    <p className="mt-3 text-lg font-semibold text-cyan-300">{item.impact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-semibold text-slate-300">{t("pipelineByStage")}</p>
              <div className="mt-5 space-y-4">
                {pipelineOverview.map((stage) => (
                  <div key={stage.stage}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">{t(stage.stage)}</span>
                      <span className="text-slate-400">{formatCurrency(stage.value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: stage.color,
                          width: `${Math.max(16, (stage.value / 412000) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {executiveMetrics.map((metric) => (
            <Card className="p-5" key={metric.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{t(metric.label)}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-normal">{metric.value}</p>
                </div>
                <span className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700">
                  {metric.progress}%
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-slate-500">{metric.detail}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#07111f] to-[#1fb6a6]"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {executiveMetrics.map((metric, index) => (
          <Card
            className={`relative overflow-hidden p-5 ${
              index === 0
                ? "!border-[#07111f] !bg-[#07111f] !text-white !ring-0 shadow-[0_24px_70px_rgba(7,17,31,0.26)]"
                : ""
            }`}
            key={`mini-${metric.label}`}
          >
            <div
              className={`absolute left-0 top-0 h-full w-1 ${
                index % 3 === 0 ? "bg-cyan-400" : index % 3 === 1 ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <p className={`text-sm font-medium ${index === 0 ? "text-slate-300" : "text-slate-500"}`}>
              {t(metric.label)}
            </p>
            <div className="mt-5 flex items-end justify-between gap-3">
              <p className={`text-3xl font-semibold tracking-normal ${index === 0 ? "text-white" : "text-slate-950"}`}>
                {metric.value}
              </p>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                {metric.progress}%
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
          <div className="mt-8 flex h-72 gap-3 rounded-lg bg-[#f7fafc] px-4 pb-4 pt-8 ring-1 ring-slate-950/[0.03]">
            {trend.map((value, index) => (
              <div className="flex h-full flex-1 flex-col items-center gap-3" key={`${value}-${index}`}>
                <div className="flex min-h-0 w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#07111f] to-[#1fb6a6] shadow-[0_12px_26px_rgba(7,17,31,0.18)]"
                    style={{ height: `${Math.max(16, (value / maxTrend) * 100)}%` }}
                  />
                </div>
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
          <h2 className="text-lg font-semibold">{t("accountRisk")}</h2>
          <div className="mt-6 space-y-4">
            {riskAccounts.map((account) => (
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4" key={account.account}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{account.account}</p>
                    <p className="mt-1 text-xs text-slate-500">{account.owner}</p>
                  </div>
                  <span className="text-sm font-semibold text-rose-600">{account.health}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div className="h-full rounded-full bg-rose-500" style={{ width: `${account.health}%` }} />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-700">{account.reason}</p>
                <p className="mt-1 text-xs text-slate-500">{account.note}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">{t("teamLeaderboard")}</h2>
            <div className="mt-5 space-y-4">
              {leaderboard.map((member, index) => (
                <div className="flex items-center gap-4" key={member.name}>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-slate-500">
                      {formatCurrency(member.revenue)} · {member.winRate}% {t("winRate")}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{member.activities}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">{t("automationPlaybooks")}</h2>
            <div className="mt-5 space-y-3">
              {playbooks.map((playbook) => (
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4" key={playbook.name}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{playbook.name}</p>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {playbook.active}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{playbook.steps} workflow steps</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">{t("recentActivity")}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {activities.map((activity) => (
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3" key={activity}>
              <p className="text-sm font-medium text-slate-700">{t(activity)}</p>
            </div>
          ))}
          </div>
      </Card>
    </div>
  );
}

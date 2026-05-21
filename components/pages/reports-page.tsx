"use client";

import { useMemo, useState } from "react";
import { formatCurrency, leadSources, trend } from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { DownloadIcon } from "@/components/icons";
import { Button, Card, PageHeader, cx } from "@/components/ui";

type Range = "thisMonth" | "quarter" | "year";
const ranges: Range[] = ["thisMonth", "quarter", "year"];
const multipliers: Record<Range, number> = {
  thisMonth: 0.32,
  quarter: 0.68,
  year: 1,
};

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReportsPage() {
  const { t } = useCrm();
  const [range, setRange] = useState<Range>("quarter");
  const values = useMemo(() => trend.map((value) => Math.round(value * multipliers[range])), [range]);
  const max = Math.max(...values);
  const totalRevenue = values.reduce((sum, item) => sum + item, 0) * 1000;

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <Button
            onClick={() =>
              downloadCsv("crm-report.csv", [
                ["Month", "Revenue"],
                ...values.map((value, index) => [`${index + 1}`, String(value * 1000)]),
              ])
            }
          >
            <DownloadIcon className="h-4 w-4" />
            {t("exportCsv")}
          </Button>
        }
        subtitle={t("reportsSubtitle")}
        title={t("reportsTitle")}
      />

      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
        {ranges.map((item) => (
          <button
            className={cx(
              "h-9 rounded-md px-4 text-sm font-semibold transition",
              range === item ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100",
            )}
            key={item}
            onClick={() => setRange(item)}
            type="button"
          >
            {t(item)}
          </button>
        ))}
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{t("salesChart")}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {formatCurrency(totalRevenue)} {t("pipelineRevenue")}
              </p>
            </div>
            <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              +16.8%
            </span>
          </div>
          <div className="mt-8 flex h-80 gap-3 rounded-lg bg-[#f7fafc] px-4 pb-4 pt-8 ring-1 ring-slate-950/[0.03]">
            {values.map((value, index) => (
              <div className="flex h-full flex-1 flex-col items-center gap-3" key={`${range}-${value}-${index}`}>
                <div className="flex min-h-0 w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#07111f] via-[#155e75] to-[#22c55e] shadow-[0_12px_26px_rgba(7,17,31,0.18)]"
                    style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("leadSourceBreakdown")}</h2>
          <div className="mt-6 space-y-5">
            {leadSources.map((source) => (
              <div key={source.source}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold">{t(source.source)}</span>
                  <span className="text-slate-500">
                    {source.leads} {t("leadsUnit")}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#07111f] to-[#1fb6a6]"
                    style={{ width: `${source.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  formatCurrency,
  initialLeads,
  type Lead,
  type SourceKey,
  type StatusKey,
} from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { DownloadIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { Button, Card, Field, PageHeader, StatusPill, inputClass } from "@/components/ui";

const statusOptions: StatusKey[] = ["newLead", "contacted", "qualified", "proposal", "active"];
const sourceOptions: SourceKey[] = ["referral", "linkedIn", "webForm", "outbound"];

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function LeadsPage() {
  const { t } = useCrm();
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    source: "linkedIn" as SourceKey,
    value: "36000",
  });

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const matchesQuery = `${lead.name} ${lead.company} ${lead.owner}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus = status === "all" || lead.status === status;
        return matchesQuery && matchesStatus;
      }),
    [leads, query, status],
  );

  const saveLead = () => {
    if (!form.name.trim() || !form.company.trim()) {
      return;
    }

    const nextLead: Lead = {
      id: Date.now(),
      company: form.company.trim(),
      lastContact: "Today",
      name: form.name.trim(),
      owner: "Maya",
      source: form.source,
      status: "newLead",
      value: Number(form.value) || 0,
    };

    setLeads((current) => [nextLead, ...current]);
    setForm({ company: "", name: "", source: "linkedIn", value: "36000" });
    setShowForm(false);
  };

  const convertLead = (id: number) => {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status: "active" as StatusKey } : lead)),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <>
            <Button onClick={() => setShowForm((value) => !value)} variant="secondary">
              <PlusIcon className="h-4 w-4" />
              {t("addLead")}
            </Button>
            <Button
              onClick={() =>
                downloadCsv("leads.csv", [
                  [t("leadName"), t("company"), t("source"), t("status"), t("value")],
                  ...filteredLeads.map((lead) => [
                    lead.name,
                    lead.company,
                    t(lead.source),
                    t(lead.status),
                    String(lead.value),
                  ]),
                ])
              }
            >
              <DownloadIcon className="h-4 w-4" />
              {t("exportCsv")}
            </Button>
          </>
        }
        subtitle={t("leadsSubtitle")}
        title={t("leadsTitle")}
      />

      {showForm ? (
        <Card className="p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <Field label={t("leadName")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Taylor Brooks"
                value={form.name}
              />
            </Field>
            <Field label={t("company")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                placeholder="Acme SaaS"
                value={form.company}
              />
            </Field>
            <Field label={t("source")}>
              <select
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, source: event.target.value as SourceKey }))}
                value={form.source}
              >
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {t(source)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("value")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
                type="number"
                value={form.value}
              />
            </Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setShowForm(false)} variant="secondary">
              {t("cancel")}
            </Button>
            <Button onClick={saveLead}>{t("saveLead")}</Button>
          </div>
        </Card>
      ) : null}

      <Card className="p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              className={`${inputClass} pl-10`}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search")}
              value={query}
            />
          </label>
          <select
            className={inputClass}
            onChange={(event) => setStatus(event.target.value as StatusKey | "all")}
            value={status}
          >
            <option value="all">{t("allStatus")}</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {t(item)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                <th className="py-3 pr-4">{t("leadName")}</th>
                <th className="py-3 pr-4">{t("company")}</th>
                <th className="py-3 pr-4">{t("source")}</th>
                <th className="py-3 pr-4">{t("owner")}</th>
                <th className="py-3 pr-4">{t("status")}</th>
                <th className="py-3 pr-4">{t("value")}</th>
                <th className="py-3">{t("nextStep")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-4 pr-4 font-semibold">{lead.name}</td>
                  <td className="py-4 pr-4 text-slate-600">{lead.company}</td>
                  <td className="py-4 pr-4 text-slate-600">{t(lead.source)}</td>
                  <td className="py-4 pr-4 text-slate-600">{lead.owner}</td>
                  <td className="py-4 pr-4">
                    <StatusPill tone={lead.status === "active" ? "green" : "blue"}>{t(lead.status)}</StatusPill>
                  </td>
                  <td className="py-4 pr-4 font-semibold">{formatCurrency(lead.value)}</td>
                  <td className="py-4">
                    {lead.status === "active" ? (
                      <StatusPill tone="green">{t("customers")}</StatusPill>
                    ) : (
                      <Button className="h-8 px-3" onClick={() => convertLead(lead.id)} variant="secondary">
                        {t("convert")}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 ? (
            <p className="py-12 text-center text-sm font-medium text-slate-500">{t("noResults")}</p>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

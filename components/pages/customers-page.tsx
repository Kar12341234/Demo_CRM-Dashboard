"use client";

import { useMemo, useState } from "react";
import { customers, formatCurrency, type Customer, type SegmentKey } from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { SearchIcon } from "@/components/icons";
import { Button, Card, PageHeader, StatusPill, inputClass } from "@/components/ui";

const segments: Array<SegmentKey | "all"> = ["all", "enterprise", "midMarket", "startup"];

export function CustomersPage() {
  const { t } = useCrm();
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<SegmentKey | "all">("all");
  const [selected, setSelected] = useState<Customer | null>(customers[0]);

  const filtered = useMemo(
    () =>
      customers.filter((customer) => {
        const matchesQuery = `${customer.name} ${customer.company} ${customer.owner}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesSegment = segment === "all" || customer.segment === segment;
        return matchesQuery && matchesSegment;
      }),
    [query, segment],
  );

  return (
    <div className="space-y-6">
      <PageHeader subtitle={t("customersSubtitle")} title={t("customersTitle")} />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
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
              onChange={(event) => setSegment(event.target.value as SegmentKey | "all")}
              value={segment}
            >
              {segments.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? t("allStatus") : t(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                  <th className="py-3 pr-4">{t("leadName")}</th>
                  <th className="py-3 pr-4">{t("company")}</th>
                  <th className="py-3 pr-4">{t("segment")}</th>
                  <th className="py-3 pr-4">{t("health")}</th>
                  <th className="py-3 pr-4">{t("value")}</th>
                  <th className="py-3">{t("openProfile")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((customer) => (
                  <tr key={customer.id}>
                    <td className="py-4 pr-4 font-semibold">{customer.name}</td>
                    <td className="py-4 pr-4 text-slate-600">{customer.company}</td>
                    <td className="py-4 pr-4 text-slate-600">{t(customer.segment)}</td>
                    <td className="py-4 pr-4">
                      <StatusPill
                        tone={
                          customer.health === "atRisk"
                            ? "rose"
                            : customer.health === "expanding"
                              ? "green"
                              : "blue"
                        }
                      >
                        {t(customer.health)}
                      </StatusPill>
                    </td>
                    <td className="py-4 pr-4 font-semibold">{formatCurrency(customer.value)}</td>
                    <td className="py-4">
                      <Button className="h-8 px-3" onClick={() => setSelected(customer)} variant="secondary">
                        {t("openProfile")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm font-medium text-slate-500">{t("noResults")}</p>
            ) : null}
          </div>
        </Card>

        <Card className="p-6">
          {selected ? (
            <div>
              <p className="text-sm font-semibold text-slate-400">{t("customers")}</p>
              <h2 className="mt-2 text-2xl font-semibold">{selected.company}</h2>
              <p className="mt-1 text-sm text-slate-500">{selected.name}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">{t("accountOwner")}</dt>
                  <dd className="font-semibold">{selected.owner}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">{t("dealValue")}</dt>
                  <dd className="font-semibold">{formatCurrency(selected.value)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">{t("renewal")}</dt>
                  <dd className="font-semibold">{selected.renewal}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">{t("lastContact")}</dt>
                  <dd className="font-semibold">{selected.lastContact}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </Card>
      </section>
    </div>
  );
}

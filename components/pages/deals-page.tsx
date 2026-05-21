"use client";

import { useState } from "react";
import {
  dealStages,
  dealDeskItems,
  formatCurrency,
  initialDeals,
  type Deal,
  type StageKey,
} from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Button, Card, PageHeader, StatusPill } from "@/components/ui";

function nextStage(stage: StageKey): StageKey {
  const index = dealStages.indexOf(stage);
  return dealStages[Math.min(index + 1, dealStages.length - 2)];
}

export function DealsPage() {
  const { t } = useCrm();
  const [deals, setDeals] = useState(initialDeals);

  const updateDeal = (id: number, updater: (deal: Deal) => Deal) => {
    setDeals((current) => current.map((deal) => (deal.id === id ? updater(deal) : deal)));
  };

  return (
    <div className="space-y-6">
      <PageHeader subtitle={t("dealsSubtitle")} title={t("dealsTitle")} />

      <section className="grid gap-4 md:grid-cols-3">
        {dealDeskItems.map((item) => (
          <Card className="p-5" key={item.account}>
            <p className="text-sm font-medium text-slate-500">{t("dealDesk")}</p>
            <h2 className="mt-3 text-lg font-semibold">{item.account}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-400">{t("quoteStatus")}</p>
                <p className="mt-2 font-semibold">{t(item.quote)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-400">{t("approval")}</p>
                <p className="mt-2 font-semibold">{t(item.approval)}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-6">
        {dealStages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage);
          const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

          return (
            <Card className="min-h-[420px] p-4" key={stage}>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">{t(stage)}</h2>
                  <p className="mt-1 text-xs text-slate-500">{formatCurrency(total)}</p>
                </div>
                <StatusPill tone={stage === "wonStage" ? "green" : stage === "lostStage" ? "rose" : "slate"}>
                  {stageDeals.length}
                </StatusPill>
              </div>
              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <article className="rounded-lg border border-slate-200 bg-white p-4" key={deal.id}>
                    <p className="font-semibold">{deal.account}</p>
                    <p className="mt-1 text-xs text-slate-500">{deal.owner}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t("dealValue")}</span>
                        <span className="font-semibold">{formatCurrency(deal.value)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t("probability")}</span>
                        <span className="font-semibold">{deal.probability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t("closeDate")}</span>
                        <span className="font-semibold">{deal.closeDate}</span>
                      </div>
                    </div>
                    {deal.stage !== "wonStage" && deal.stage !== "lostStage" ? (
                      <div className="mt-4 flex flex-col gap-2">
                        <Button
                          className="h-8 w-full px-3"
                          onClick={() =>
                            updateDeal(deal.id, (current) => ({
                              ...current,
                              probability: Math.min(95, current.probability + 12),
                              stage: nextStage(current.stage),
                            }))
                          }
                          variant="secondary"
                        >
                          {t("moveNext")}
                          <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          className="h-8 w-full px-3"
                          onClick={() =>
                            updateDeal(deal.id, (current) => ({
                              ...current,
                              probability: 100,
                              stage: "wonStage",
                            }))
                          }
                        >
                          <CheckIcon className="h-4 w-4" />
                          {t("markWon")}
                        </Button>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

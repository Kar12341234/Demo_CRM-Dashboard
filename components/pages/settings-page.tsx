"use client";

import { useState } from "react";
import { teamMembers } from "@/lib/crm-data";
import { localeLabels, type Locale } from "@/lib/i18n";
import { useCrm } from "@/components/crm-provider";
import { Button, Card, Field, PageHeader, StatusPill, inputClass } from "@/components/ui";

export function SettingsPage() {
  const { locale, setLocale, t } = useCrm();
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [target, setTarget] = useState(1240000);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      <PageHeader subtitle={t("settingsSubtitle")} title={t("settingsTitle")} />

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("preferences")}</h2>
          <div className="mt-6 space-y-5">
            <Field label={t("language")}>
              <select
                className={inputClass}
                onChange={(event) => setLocale(event.target.value as Locale)}
                value={locale}
              >
                {(Object.keys(localeLabels) as Locale[]).map((item) => (
                  <option key={item} value={item}>
                    {localeLabels[item]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("targetRevenue")}>
              <input
                className={inputClass}
                onChange={(event) => setTarget(Number(event.target.value))}
                type="number"
                value={target}
              />
            </Field>
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold">{t("notifications")}</span>
                <span className="text-xs text-slate-500">{t("notificationsDesc")}</span>
                </span>
              <input
                checked={notifications}
                className="h-5 w-5 accent-slate-950"
                onChange={(event) => setNotifications(event.target.checked)}
                type="checkbox"
              />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold">{t("weeklyDigest")}</span>
                <span className="text-xs text-slate-500">{t("weeklyDigestDesc")}</span>
                </span>
              <input
                checked={weeklyDigest}
                className="h-5 w-5 accent-slate-950"
                onChange={(event) => setWeeklyDigest(event.target.checked)}
                type="checkbox"
              />
            </label>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button onClick={save}>{t("saveSettings")}</Button>
            {saved ? <StatusPill tone="green">{t("saved")}</StatusPill> : null}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">{t("teamMembers")}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                  <th className="py-3 pr-4">{t("leadName")}</th>
                  <th className="py-3 pr-4">{t("role")}</th>
                  <th className="py-3">{t("permission")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamMembers.map((member) => (
                  <tr key={member.name}>
                    <td className="py-4 pr-4 font-semibold">{member.name}</td>
                    <td className="py-4 pr-4 text-slate-600">{t(member.role)}</td>
                    <td className="py-4">
                      <StatusPill tone={member.permission === "fullAccess" ? "green" : "blue"}>
                        {t(member.permission)}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

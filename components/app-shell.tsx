"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, type Locale, type TranslationKey } from "@/lib/i18n";
import { useCrm } from "@/components/crm-provider";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CustomersIcon,
  DashboardIcon,
  DealsIcon,
  GlobeIcon,
  LeadsIcon,
  ReportsIcon,
  SettingsIcon,
  TasksIcon,
} from "@/components/icons";
import { cx } from "@/components/ui";

const navItems: Array<{
  href: string;
  label: TranslationKey;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { href: "/dashboard", label: "dashboard", icon: DashboardIcon },
  { href: "/leads", label: "leads", icon: LeadsIcon },
  { href: "/customers", label: "customers", icon: CustomersIcon },
  { href: "/deals", label: "deals", icon: DealsIcon },
  { href: "/tasks", label: "tasks", icon: TasksIcon },
  { href: "/reports", label: "reports", icon: ReportsIcon },
  { href: "/settings", label: "settings", icon: SettingsIcon },
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { collapsed, locale, setCollapsed, setLocale, t } = useCrm();

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-950">
      <div className="flex min-h-screen">
        <aside
          className={cx(
            "sticky top-0 hidden h-screen shrink-0 border-r border-slate-200/80 bg-white/92 px-3 py-5 shadow-[12px_0_40px_rgba(15,23,42,0.04)] backdrop-blur xl:block",
            collapsed ? "w-[88px]" : "w-[286px]",
          )}
        >
          <div className="flex h-full flex-col">
            <div className={cx("flex items-center", collapsed ? "justify-center" : "justify-between")}>
              <Link className="flex min-w-0 items-center gap-3" href="/dashboard">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                  N
                </span>
                {!collapsed ? (
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t("appName")}</span>
                    <span className="block truncate text-xs text-slate-500">{t("workspace")}</span>
                  </span>
                ) : null}
              </Link>
              {!collapsed ? (
                <button
                  aria-label={t("collapse")}
                  className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  onClick={() => setCollapsed(true)}
                  type="button"
                >
                  <ChevronLeftIcon />
                </button>
              ) : null}
            </div>

            {collapsed ? (
              <button
                aria-label={t("expand")}
                className="mx-auto mt-4 grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                onClick={() => setCollapsed(false)}
                type="button"
              >
                <ChevronRightIcon />
              </button>
            ) : null}

            <nav className="mt-8 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    className={cx(
                      "group flex h-11 items-center rounded-lg px-3 text-sm font-semibold transition",
                      collapsed ? "justify-center" : "gap-3",
                      active
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-950",
                    )}
                    href={item.href}
                    key={item.href}
                    title={collapsed ? t(item.label) : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed ? <span>{t(item.label)}</span> : null}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <div
                className={cx(
                  "rounded-lg border border-slate-200 bg-slate-50 p-3",
                  collapsed && "flex justify-center border-0 bg-transparent p-0",
                )}
              >
                {!collapsed ? (
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                    <GlobeIcon className="h-4 w-4" />
                    {t("language")}
                  </div>
                ) : null}
                <select
                  aria-label={t("language")}
                  className={cx(
                    "h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700 outline-none",
                    collapsed ? "w-14" : "w-full",
                  )}
                  onChange={(event) => setLocale(event.target.value as Locale)}
                  value={locale}
                >
                  {(Object.keys(localeLabels) as Locale[]).map((item) => (
                    <option key={item} value={item}>
                      {localeLabels[item]}
                    </option>
                  ))}
                </select>
              </div>
              {!collapsed ? (
                <p className="mt-3 px-2 text-xs text-slate-400">{t("portfolio")}</p>
              ) : null}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/86 px-4 py-3 backdrop-blur xl:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link className="flex items-center gap-3" href="/dashboard">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                  N
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t("appName")}</span>
                  <span className="block text-xs text-slate-500">{t("portfolio")}</span>
                </span>
              </Link>
              <select
                aria-label={t("language")}
                className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700 outline-none"
                onChange={(event) => setLocale(event.target.value as Locale)}
                value={locale}
              >
                {(Object.keys(localeLabels) as Locale[]).map((item) => (
                  <option key={item} value={item}>
                    {localeLabels[item]}
                  </option>
                ))}
              </select>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    className={cx(
                      "flex h-10 min-w-max items-center gap-2 rounded-lg px-3 text-sm font-semibold",
                      active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600",
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {t(item.label)}
                  </Link>
                );
              })}
            </nav>
          </header>
          <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

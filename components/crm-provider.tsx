"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, type TranslationKey, translate } from "@/lib/i18n";

type CrmContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  t: (key: TranslationKey) => string;
};

const CrmContext = createContext<CrmContextValue | null>(null);

export function CrmProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>("zhHant");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("crm-locale") as Locale | null;
    const savedCollapsed = window.localStorage.getItem("crm-sidebar-collapsed");

    if (savedLocale === "zhHant" || savedLocale === "zhHans" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }

    if (savedCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("crm-locale", nextLocale);
  };

  const updateCollapsed = (nextCollapsed: boolean) => {
    setCollapsed(nextCollapsed);
    window.localStorage.setItem("crm-sidebar-collapsed", String(nextCollapsed));
  };

  const value = useMemo<CrmContextValue>(
    () => ({
      locale,
      setLocale,
      collapsed,
      setCollapsed: updateCollapsed,
      t: (key) => translate(locale, key),
    }),
    [collapsed, locale],
  );

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error("useCrm must be used within CrmProvider");
  }
  return context;
}

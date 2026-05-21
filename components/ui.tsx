import Link from "next/link";
import type { ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Card({
  children,
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"section">>) {
  return (
    <section
      className={cx(
        "rounded-lg border border-white/70 bg-white/90 shadow-[0_22px_70px_rgba(13,27,54,0.09)] ring-1 ring-slate-950/[0.025] backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: Readonly<{ title: string; subtitle: string; actions?: ReactNode }>) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-[28px] font-semibold tracking-normal text-slate-950 md:text-[34px]">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>) {
  return (
    <button
      className={cx(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variant === "primary" &&
          "bg-[#07111f] text-white shadow-[0_12px_28px_rgba(7,17,31,0.18)] hover:bg-[#12233a]",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300 hover:bg-slate-50",
        variant === "ghost" && "text-slate-600 hover:bg-white/70 hover:text-slate-950",
        className,
      )}
      type={props.type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  className,
  href,
  variant = "primary",
}: Readonly<{ children: ReactNode; className?: string; href: string; variant?: "primary" | "secondary" }>) {
  return (
    <Link
      className={cx(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variant === "primary" &&
          "bg-[#07111f] text-white shadow-[0_12px_28px_rgba(7,17,31,0.18)] hover:bg-[#12233a]",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export function Field({
  label,
  children,
}: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

export function StatusPill({
  children,
  tone = "slate",
}: Readonly<{ children: ReactNode; tone?: "slate" | "green" | "amber" | "rose" | "blue" }>) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold",
        tone === "slate" && "bg-slate-100 text-slate-700",
        tone === "green" && "bg-emerald-50 text-emerald-700",
        tone === "amber" && "bg-amber-50 text-amber-700",
        tone === "rose" && "bg-rose-50 text-rose-700",
        tone === "blue" && "bg-blue-50 text-blue-700",
      )}
    >
      {children}
    </span>
  );
}

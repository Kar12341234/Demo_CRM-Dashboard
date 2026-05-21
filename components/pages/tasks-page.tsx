"use client";

import { useMemo, useState } from "react";
import { initialTasks, type PriorityKey, type TaskItem } from "@/lib/crm-data";
import { useCrm } from "@/components/crm-provider";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { Button, Card, Field, PageHeader, StatusPill, inputClass } from "@/components/ui";

const priorities: Array<PriorityKey | "all"> = ["all", "high", "medium", "low"];

export function TasksPage() {
  const { t } = useCrm();
  const [tasks, setTasks] = useState(initialTasks);
  const [priority, setPriority] = useState<PriorityKey | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    account: "",
    due: "Tomorrow",
    priority: "medium" as PriorityKey,
    title: "",
  });

  const filtered = useMemo(
    () => tasks.filter((task) => priority === "all" || task.priority === priority),
    [priority, tasks],
  );

  const addTask = () => {
    if (!form.title.trim() || !form.account.trim()) {
      return;
    }

    const task: TaskItem = {
      id: Date.now(),
      account: form.account.trim(),
      due: form.due,
      done: false,
      priority: form.priority,
      title: form.title.trim(),
    };
    setTasks((current) => [task, ...current]);
    setForm({ account: "", due: "Tomorrow", priority: "medium", title: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <Button onClick={() => setShowForm((value) => !value)}>
            <PlusIcon className="h-4 w-4" />
            {t("addTask")}
          </Button>
        }
        subtitle={t("tasksSubtitle")}
        title={t("tasksTitle")}
      />

      {showForm ? (
        <Card className="p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <Field label={t("task")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Call procurement"
                value={form.title}
              />
            </Field>
            <Field label={t("company")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, account: event.target.value }))}
                placeholder="Northstar Analytics"
                value={form.account}
              />
            </Field>
            <Field label={t("due")}>
              <input
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, due: event.target.value }))}
                value={form.due}
              />
            </Field>
            <Field label={t("priority")}>
              <select
                className={inputClass}
                onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as PriorityKey }))}
                value={form.priority}
              >
                {priorities
                  .filter((item) => item !== "all")
                  .map((item) => (
                    <option key={item} value={item}>
                      {t(item)}
                    </option>
                  ))}
              </select>
            </Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setShowForm(false)} variant="secondary">
              {t("cancel")}
            </Button>
            <Button onClick={addTask}>{t("addTask")}</Button>
          </div>
        </Card>
      ) : null}

      <Card className="p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t("tasks")}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filtered.length} {t("openWorkflowItems")}
            </p>
          </div>
          <select
            className={`${inputClass} md:w-48`}
            onChange={(event) => setPriority(event.target.value as PriorityKey | "all")}
            value={priority}
          >
            {priorities.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? t("allStatus") : t(item)}
              </option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((task) => (
            <article className="grid gap-4 py-4 md:grid-cols-[1fr_150px_120px_120px]" key={task.id}>
              <div className={task.done ? "text-slate-400 line-through" : undefined}>
                <p className="font-semibold">{task.title}</p>
                <p className="mt-1 text-sm text-slate-500">{task.account}</p>
              </div>
              <p className="text-sm font-medium text-slate-600">{task.due}</p>
              <StatusPill tone={task.priority === "high" ? "rose" : task.priority === "medium" ? "amber" : "blue"}>
                {t(task.priority)}
              </StatusPill>
              <Button
                className="h-8 px-3"
                onClick={() =>
                  setTasks((current) =>
                    current.map((item) => (item.id === task.id ? { ...item, done: !item.done } : item)),
                  )
                }
                variant={task.done ? "secondary" : "primary"}
              >
                {task.done ? t("reopen") : <CheckIcon className="h-4 w-4" />}
                {task.done ? null : t("complete")}
              </Button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

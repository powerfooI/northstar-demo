import { expect, test } from "bun:test";
import { selectTasks, tasks } from "./tasks";

test("the six fictional cards match the static preview", async () => {
  const html = await Bun.file(new URL("index.html", import.meta.url)).text();
  expect(tasks).toHaveLength(6);
  expect(new Set(tasks.map((task) => task.id)).size).toBe(tasks.length);
  for (const task of tasks) {
    expect(html).toContain(`id="${task.id}"`);
    expect(html).toContain(task.title);
  }
  expect(tasks.map((task) => task.status).sort()).toEqual([
    "active",
    "active",
    "done",
    "done",
    "todo",
    "todo",
  ]);
});

test("title search is case insensitive and ignores surrounding spaces", () => {
  expect(selectTasks(tasks, "  NAVIGATION  ").map((task) => task.id)).toEqual([
    "N-101",
    "N-104",
  ]);
  expect(selectTasks(tasks, "")).toEqual([...tasks]);
  expect(selectTasks(tasks, "unmatched task")).toEqual([]);
});

test("status filters combine with title search", () => {
  expect(selectTasks(tasks, "", "active").map((task) => task.id)).toEqual([
    "N-102",
    "N-104",
  ]);
  expect(
    selectTasks(tasks, "NAVIGATION", "todo").map((task) => task.id),
  ).toEqual(["N-101"]);
  expect(selectTasks(tasks, "navigation", "done")).toEqual([]);
});

test("clearing query and status restores every task after an empty result", () => {
  expect(selectTasks(tasks, "unmatched task", "active")).toEqual([]);
  expect(selectTasks(tasks, "", "all")).toEqual([...tasks]);
});

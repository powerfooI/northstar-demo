import { selectTasks, type StatusFilter, tasks } from "./tasks";

const search = document.querySelector<HTMLInputElement>("#search");
const count = document.querySelector<HTMLOutputElement>("#result-count");
const empty = document.querySelector<HTMLElement>("#empty-state");
const clear = document.querySelector<HTMLButtonElement>("#clear-filters");
const filters = document.querySelectorAll<HTMLButtonElement>("[data-status]");
if (!search || !count || !empty || !clear) {
  throw new Error("Board controls are missing");
}
let status: StatusFilter = "all";

function render() {
  const visible = selectTasks(tasks, search!.value, status);
  const ids = new Set(visible.map((task) => task.id));
  for (const task of tasks) {
    const card = document.getElementById(task.id);
    if (card) card.hidden = !ids.has(task.id);
  }
  for (const button of filters) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.status === status),
    );
  }
  count!.textContent = `${visible.length} of ${tasks.length} tasks`;
  empty!.hidden = visible.length > 0;
}

for (const button of filters) {
  button.disabled = false;
  button.addEventListener("click", () => {
    status = button.dataset.status as StatusFilter;
    render();
  });
}
clear.disabled = false;
clear.addEventListener("click", () => {
  search.value = "";
  status = "all";
  render();
  search.focus();
});
search.disabled = false;
search.addEventListener("input", render);
render();

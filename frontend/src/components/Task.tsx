import type { TaskType } from "./types";

export default function Task({
  id,
  title,
  priority,
  column_status,
  created_by,
  due_date,
}: TaskType) {
  return (
    <li className="task flex items-center border-t-2 mt-2 py-2">
      <i className="fa-regular fa-circle-check text-2xl font-light mx-2"></i>

      <div className="task-content basis-full flex flex-wrap  justify-between px-3">
        <h4 className="w-full">
          {title}/{id}
        </h4>

        <div className="task-info flex flex-col justify-between">
          <p>
            <i className="fa-solid fa-fire mr-2"></i>
            <span>{priority}</span>
          </p>

          <p>
            <i className="fa-solid fa-user mr-2"></i>
            <span>{created_by.username}</span>
          </p>
        </div>

        <div className="task-info  flex flex-col justify-between px-3">
          <p>
            <i className="fa-solid fa-gear mr-2"></i>
            <span>{column_status}</span>
          </p>

          <p>
            <i className="fa-solid fa-calendar-day mr-2"></i>
            <span>{due_date}</span>
          </p>
        </div>
      </div>
    </li>
  );
}

import { useEffect, useState } from "react";
import Task from "./Task";

import { fetchData } from "./helpers";
import type { TaskType } from "./types";

export default function TaskList({
  forYouType,
  taskListType,
}: {
  forYouType: string;
  taskListType: string;
}) {
  const [tasklist, setTaskList] = useState<TaskType[]>([]);

  useEffect(() => {
    async function getTasks(url: string) {
      const response = await fetchData<TaskType[]>(url, "GET", {
        "Content-Type": "application/json",
      });
      if (!response.ok) console.log("Pop up z errorem");
      setTaskList(response.data);
      console.log(response.data);
    }
    getTasks(
      `http://127.0.0.1:8000/api/tasks/?column__status_type=${taskListType}&${forYouType == "assigned" ? "assigned_to__username=admin" : "created_by__username=admin"}`,
    );
  }, [forYouType, taskListType]);
  return (
    <>
      <ol>
        {tasklist.map((el) => {
          return (
            <Task
              key={el.id}
              id={el.id}
              title={el.title}
              priority={el.priority}
              column_status={el.column_status}
              created_by={el.created_by}
              due_date={el.due_date}
            />
          );
        })}
      </ol>
    </>
  );
}

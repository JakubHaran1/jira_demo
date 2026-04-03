import { useEffect, useState } from "react";
import Task from "./Task";

import { fetchData } from "./helpers";
import type TaskType from "./types";
export default function TaskList({}) {
  const [tasklist, setTaskList] = useState<TaskType[]>([]);
  useEffect(() => {
    async function getTasks(url: string) {
      try {
        const response = await fetchData<TaskType[]>(url);
        setTaskList(response);
        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else console.log("popup z errorem");
      }
    }
    const data = getTasks("http://127.0.0.1:8000/api/tasks/");
    console.log(data);
  }, []);
  return (
    <>
      <ol>
        <Task />
        <Task />
      </ol>
    </>
  );
}

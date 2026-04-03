import { useEffect, useState } from "react";
import Task from "./Task";
export default function TaskList({}) {
  const [tasklist, setTaskList] = useState([]);
  useEffect(() => {
    async function getData(url: string) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.status},${data.detail}`);

        setTaskList(data);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
        else console.log("Coś poszło nie tak");
      }
    }
    const url = "http://127.0.0.1:8000/api/tasks/";
    const data = getData(url);
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

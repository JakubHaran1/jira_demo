import "./App.css";

import { useState } from "react";
import NavMobile from "./components/NavMobile";
import TaskList from "./components/TaskList";
import Nav from "./components/Nav";
import type { UserType } from "./components/types";

function App() {
  const [forYou, setForYou] = useState("assigned");
  const handleChangeForYou = (state: string) => {
    setForYou(state);
  };

  const [user, SetUser] = useState<UserType | null>(null);
  return (
    <>
      <div className="jira-demo  bg-neutral-950 text-gray-400 ">
        <Nav setUser={SetUser} />
        <section className="main-page mx-auto md:w-3xl lg:w-7xl  ">
          <h2 className="font-bold text-2xl mt-4 mb-3 px-3 ">For you</h2>

          <div className="sub-nav bg-zinc-800 py-2  mb-5 text-center ">
            <button
              className={`mr-4 text-gray-100 ${forYou == "assigned" ? "active" : ""}`}
              onClick={() => handleChangeForYou("assigned")}
            >
              Assigned to me {user?.username}
            </button>
            <button
              className={`mr-4 text-gray-100 ${forYou == "created" ? "active" : ""}`}
              onClick={() => handleChangeForYou("created")}
            >
              Created by me
            </button>
          </div>

          <section className="in-progress bg-zinc-800 pt-1 pb-3 px-3 ">
            <h3 className="text-xl ">In Progress</h3>

            <TaskList forYouType={forYou} taskListType={"InProgress"} />
          </section>

          <section className="to-do bg-zinc-800 pt-1 pb-3 px-3 mt-5 ">
            <h3 className="text-xl ">To do</h3>

            <TaskList forYouType={forYou} taskListType={"ToDo"} />
          </section>
        </section>
        <NavMobile />
      </div>
    </>
  );
}

export default App;

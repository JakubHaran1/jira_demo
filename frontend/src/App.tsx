import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div className="jira-demo  bg-neutral-950 text-gray-400 ">
        <nav className="nav bg-zinc-900 sticky top-0 bg-zinc-800 p-1 px-3  md:flex items-center justify-start md:text-center">
          <p className="mr-4 hidden md:block">
            <i className="fa-solid fa-house-chimney text-xl mr-2"></i>
            <span>Main page</span>
          </p>
          <p className="mr-4 hidden md:block">
            <i className="fa-solid fa-cube text-xl mr-2"></i>
            <span>Projects</span>
          </p>
          <p className="mr-4 hidden md:block">
            <i className="fa-solid fa-clipboard-list text-xl mr-2"></i>
            <span>Boards</span>
          </p>

          <button className="add-button ">
            <span className="text-2xl font-bold ">+</span>
          </button>
        </nav>

        <section className="main-page  ">
          <h2 className="font-bold text-2xl mt-4 mb-3 px-3 ">For you</h2>

          <div className="sub-nav bg-zinc-800 py-2  mb-5 text-center ">
            <button className="mr-4 text-gray-100 active">
              Assigned to me
            </button>
            <button className="mr-4 text-gray-300 ">Created by me</button>
          </div>

          <section className="in-progress bg-zinc-800 pt-1 pb-3 px-3 ">
            <h3 className="text-xl ">In Progress</h3>

            <ol>
              <li className="task flex items-center border-t-2 mt-2 py-2">
                <i className="fa-regular fa-circle-check text-2xl font-light mx-2"></i>

                <div className="task-content basis-full flex flex-wrap  justify-between px-3">
                  <h4 className="w-full">Task1</h4>

                  <div className="task-info flex flex-col justify-between">
                    <p>
                      <i className="fa-solid fa-fire mr-2"></i>
                      <span>priority</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-user mr-2"></i>
                      <span>assigned to</span>
                    </p>
                  </div>

                  <div className="task-info  flex flex-col justify-between px-3">
                    <p>
                      <i className="fa-solid fa-gear mr-2"></i>
                      <span>status</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-calendar-day mr-2"></i>
                      <span>due date</span>
                    </p>
                  </div>
                </div>
              </li>

              <li className="task flex items-center border-t-2 mt-2 py-2 ">
                <i className="fa-regular fa-circle-check text-2xl font-light mx-2"></i>

                <div className="task-content basis-full flex flex-wrap  justify-between px-3">
                  <h4 className="w-full">Task1</h4>
                  <div className="task-info flex flex-col justify-between">
                    <p>
                      <i className="fa-solid fa-fire mr-2"></i>
                      <span>priority</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-user mr-2"></i>
                      <span>assigned to</span>
                    </p>
                  </div>

                  <div className="task-info  flex flex-col justify-between px-3">
                    <p>
                      <i className="fa-solid fa-gear mr-2"></i>
                      <span>status</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-calendar-day mr-2"></i>
                      <span>due date</span>
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </section>

          <section className="to-do bg-zinc-800 pt-1 pb-3 px-3 mt-5 ">
            <h3 className="text-xl ">To do</h3>

            <ol>
              <li className="task flex items-center border-t-2 mt-2 py-2">
                <i className="fa-regular fa-circle-check text-2xl font-light mx-2"></i>

                <div className="task-content basis-full flex flex-wrap  justify-between px-3">
                  <h4 className="w-full">Task1</h4>

                  <div className="task-info flex flex-col justify-between">
                    <p>
                      <i className="fa-solid fa-fire mr-2"></i>
                      <span>priority</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-user mr-2"></i>
                      <span>assigned to</span>
                    </p>
                  </div>

                  <div className="task-info  flex flex-col justify-between px-3">
                    <p>
                      <i className="fa-solid fa-gear mr-2"></i>
                      <span>status</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-calendar-day mr-2"></i>
                      <span>due date</span>
                    </p>
                  </div>
                </div>
              </li>
              <li className="task flex items-center border-t-2 mt-2 py-2">
                <i className="fa-regular fa-circle-check text-2xl font-light mx-2"></i>

                <div className="task-content basis-full flex flex-wrap  justify-between px-3">
                  <h4 className="w-full">Task1</h4>

                  <div className="task-info flex flex-col justify-between">
                    <p>
                      <i className="fa-solid fa-fire mr-2"></i>
                      <span>priority</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-user mr-2"></i>
                      <span>assigned to</span>
                    </p>
                  </div>

                  <div className="task-info  flex flex-col justify-between px-3">
                    <p>
                      <i className="fa-solid fa-gear mr-2"></i>
                      <span>status</span>
                    </p>

                    <p>
                      <i className="fa-solid fa-calendar-day mr-2"></i>
                      <span>due date</span>
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </section>
        </section>

        <nav className="nav-mobile-main md:hidden bottom-0 bg-zinc-900 flex justify-center text-center p-2 mt-3">
          <p className="mr-4">
            <i className="fa-solid fa-house-chimney text-xl"></i>
            <span className="block">Main page</span>
          </p>
          <p className="mr-4">
            <i className="fa-solid fa-cube text-xl"></i>
            <span className="block">Projects</span>
          </p>
          <p className="mr-4">
            <i className="fa-solid fa-clipboard-list text-xl"></i>
            <span className="block">Boards</span>
          </p>
        </nav>

        <nav className="opacity-0 disabled  flex justify-center text-center p-3 mt-3">
          <p>
            <i className="fa-solid fa-house-chimney"></i>
            <span className="block">Main page</span>
          </p>
          <p>
            <i className="fa-solid fa-cube"></i>
            <span className="block">Projects</span>
          </p>
          <p>
            <i className="fa-solid fa-clipboard-list"></i>
            <span className="block">Boards</span>
          </p>
        </nav>
      </div>
    </>
  );
}

export default App;

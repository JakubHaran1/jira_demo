import { login, getRefreshToken, fetchAuth } from "./helpers";
import type { ApiResponse, UserType } from "./types";

export default function Nav({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}) {
  const clear = () => {
    localStorage.clear();
    console.log("local storage was cleared");
  };

  const clear_acces = () => {
    localStorage.removeItem("access");
    console.log("access key in local storage was cleared");
  };

  return (
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

      <button
        className="add-button "
        onClick={async () => {
          const data = await login();
          if (data) setUser({ ...data });
          console.log(data);
        }}
      >
        <span className="text-2xl font-bold ">+</span>
      </button>

      <button
        className="add-button "
        onClick={async () => {
          const data = await getRefreshToken();
          console.log(data);
        }}
      >
        <span className="text-2xl font-bold ">=</span>
      </button>
      <button
        className="add-button "
        onClick={async () => {
          const data = await fetchAuth<ApiResponse<UserType>>(
            "http://127.0.0.1:8000/api/users/current_user/",
            "GET",
          );

          console.log(data);
        }}
      >
        <span className="text-2xl font-bold ">-</span>
      </button>
      <button
        className="add-button "
        onClick={async () => {
          clear();
        }}
      >
        <span className="text-2xl font-bold ">x</span>
      </button>
      <button
        className="add-button "
        onClick={async () => {
          clear_acces();
        }}
      >
        <span className="text-2xl font-bold ">y</span>
      </button>
    </nav>
  );
}

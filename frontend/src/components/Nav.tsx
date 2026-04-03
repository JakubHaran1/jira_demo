// interface JWTtypes {
//   access: string;
//   refresh: string;
// }

export default function Nav() {
  async function login() {
    // try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.detail}`);
    localStorage.setItem("refresh", data["refresh"]);
    localStorage.setItem("access", data["access"]);

    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.log(error.message);
    //   } else {
    //     console.log("Nieoczekiwany bład");
    //   }
    //
    // }
  }

  const getRefreshToken = async function () {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      console.log("Render do login page");
      return null;
    }
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });
    const data = await response.json();
    localStorage.setItem("access", data["access"]);
    console.log(data.access);
    return data.access;
  };

  const fetchAuth = async function (url: string, method: string, data: {}) {
    let token = localStorage.getItem("access");

    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      token = await getRefreshToken();

      if (!token) {
        localStorage.clear();
        console.log("return to login");
        return null;
      }
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (!response.ok) {
      console.log("Niewłaściwy request");
      return null;
    }
    const response_data = await response.json();
    console.log(response_data);
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
          console.log(data);
        }}>
        <span className="text-2xl font-bold ">+</span>
      </button>

      <button
        className="add-button "
        onClick={async () => {
          const data = await getRefreshToken();
          console.log(data);
        }}>
        <span className="text-2xl font-bold ">=</span>
      </button>
      <button
        className="add-button "
        onClick={async () => {
          const data = await fetchAuth(
            "http://127.0.0.1:8000/api/users/current_user/",
            "GET",
            {},
          );

          console.log(data);
        }}>
        <span className="text-2xl font-bold ">-</span>
      </button>
    </nav>
  );
}

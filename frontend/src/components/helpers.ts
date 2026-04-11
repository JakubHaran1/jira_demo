import type { ApiResponse, JWTtypes, UserType, LoginTypes } from "./types";

const fetchData = async function <T>(
  url: string,
  method: string,
  headers: HeadersInit,
  data?: object,
): Promise<ApiResponse<T>> {
  let response_data: T | null = null;

  try {
    // Sprawdzanie url,internetu
    const response = await fetch(url, {
      method: method,
      headers: headers,
      ...(data && { body: JSON.stringify(data) }),
    });

    try {
      // parsowanie danych
      response_data = await response.json();
    } catch {
      console.log("Nie można przetworzyć odpowiedzi jako JSON");
    }

    // return danych
    return {
      data: response_data as T,
      status: response.status,
      ok: response.ok,
    };
  } catch {
    // Return gdy błąd w fetch
    console.log("Błąd sieciowy");

    return {
      data: response_data as T,
      status: 0,
      ok: false,
    };
  }
};

async function login(data: LoginTypes) {
  const response = await fetchData<JWTtypes>(
    "http://127.0.0.1:8000/api/token/",
    "POST",
    { "Content-type": "application/json" },
    { username: data.username, password: data.password },
  );
  if (!response.ok) {
    console.log("Pop up z error login");
    return null;
  }

  localStorage.setItem("refresh", response.data["refresh"]);
  localStorage.setItem("access", response.data["access"]);

  const user = await fetchAuth<UserType>(
    "http://127.0.0.1:8000/api/users/current_user/",
    "GET",
  );
  return user;
}

const getRefreshToken = async function () {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    console.log("Render do login page");
    return null;
  }

  const response = await fetchData<{ access: string }>(
    "http://127.0.0.1:8000/api/token/refresh/",
    "POST",
    { "Content-Type": "application/json" },
    { refresh },
  );
  if (!response.ok) {
    console.log("Pop up do login");
    return null;
  }

  localStorage.setItem("access", response.data["access"]);
  console.log(response.data);
  return response.data;
};

const fetchAuth = async function <T>(
  url: string,
  method: string,
  data?: object,
) {
  const token = localStorage.getItem("access");
  let response = await fetchData<T>(
    url,
    method,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  );

  if (response.status === 401 || response.status === 403) {
    const new_token = await getRefreshToken();

    if (!new_token) {
      localStorage.clear();
      console.log("return to login");
      return null;
    }

    response = await fetchData<T>(
      url,
      method,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${new_token.access}`,
      },
      data,
    );
  }
  if (!response.ok) {
    console.log("Niewłaściwy request");
    return null;
  }

  return response.data;
};

export { fetchData, login, getRefreshToken, fetchAuth };

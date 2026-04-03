const fetchData = async function <T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`${data?.detail || "Nieznany bład: GetData"}`);
  }

  return await response.json();
};



export { fetchData };


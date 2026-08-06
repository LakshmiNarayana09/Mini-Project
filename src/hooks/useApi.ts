import axios from "axios";
import { useEffect, useState } from "react";

function useApi<T extends { id: number }>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  
  const fetchApi = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<T[]>(url);

      setData(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);


  const addItem = async (item: Omit<T, "id">) => {
    try {
      const newId =
        data.length > 0
          ? Math.max(...data.map((user) => user.id)) + 1
          : 1;

      const newUser = {
        id: newId,
        ...item,
      } as T;

      const response = await axios.post<T>(url, newUser);

      setData((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  
  const updateItem = async (id: number, item: T) => {
    try {
      const response = await axios.put<T>(
        `${url}/${id}`,
        item
      );

      setData((prev) =>
        prev.map((user) =>
          user.id === id ? response.data : user
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);

      setData((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  };
}

export default useApi;
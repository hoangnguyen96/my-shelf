import { API_ROUTES } from "@app/constants";
import { BookType } from "@app/models";
import { HttpClient } from "@app/services";

export const getAllBook = async () => {
  try {
    const data = await HttpClient.get<BookType[]>(API_ROUTES.BOOKS);

    return data;
  } catch (error) {
    return [];
  }
};

export const getBookByParams = async (params: string) => {
  try {
    const data = await HttpClient.get<BookType[]>(
      `${API_ROUTES.BOOKS}?${params}`
    );

    return data;
  } catch (error) {
    return [];
  }
};

export const getBookById = async (id: number) => {
  try {
    const data = await HttpClient.get<BookType[]>(
      `${API_ROUTES.BOOKS}?id=${id}`
    );

    return data[0];
  } catch (error) {
    return [];
  }
};

export const addBook = async (payload: Partial<BookType>) => {
  return await HttpClient.post(API_ROUTES.BOOKS, payload);
};

export const updateBookById = async (
  id: string,
  payload: Partial<BookType>
) => {
  return await HttpClient.put(`${API_ROUTES.BOOKS}/${id}`, payload);
};

export const deleteBook = async (id: string) => {
  return await HttpClient.delete(`${API_ROUTES.BOOKS}/${id}`);
};

import { BookType } from "@app/models";
import { API_ROUTES, MESSAGES } from "@app/constants";
import { api } from "@app/services";
import { dividePaginationBooks, getThreeTopBook } from "@app/utils";

export const getAllBook = async () => {
  try {
    const data = await api.get<BookType[]>(API_ROUTES.BOOKS);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getTopThreeBook = async () => {
  try {
    const data = await api.get<BookType[]>(API_ROUTES.BOOKS, {
      next: { revalidate: 60 },
    });
    const result = getThreeTopBook(data);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getPaginatedBook = async (params?: string) => {
  try {
    const data = await api.get<BookType[]>(
      `${API_ROUTES.BOOKS}?${params || ""}`,
      {
        cache: "no-store",
      }
    );
    const result = dividePaginationBooks(data);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getTwelveItemBook = async (params?: string) => {
  try {
    const data = await api.get<BookType[]>(
      `${API_ROUTES.BOOKS}?${params || ""}page=1&limit=12`,
      { next: { revalidate: 3600 } }
    );

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getBookByParams = async (params: string) => {
  try {
    const data = await api.get<BookType[]>(`${API_ROUTES.BOOKS}?${params}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getBookById = async (id: string) => {
  try {
    const data = await api.get<BookType>(`${API_ROUTES.BOOKS}/${parseInt(id)}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const addBook = async (payload: Partial<BookType>) => {
  return await api.post(API_ROUTES.BOOKS, payload);
};

export const updateBookById = async (
  id: string,
  payload: Partial<BookType>
) => {
  return await api.put(`${API_ROUTES.BOOKS}/${id}`, payload);
};

export const deleteBook = async (id: string) => {
  return await api.delete(`${API_ROUTES.BOOKS}/${id}`);
};

import { BookType } from "@app/models";
import { API_ROUTES } from "@app/constants";
import { api } from "@app/services";
import { dividePaginationBooks, getTopBook } from "@app/utils";

export const getAllBook = async () => {
  const { data, ...rest } = await api.get<BookType[]>(API_ROUTES.BOOKS);

  return {
    data: data || [],
    ...rest,
  };
};

export const getPaginatedBook = async (params?: string) => {
  const { data, ...rest } = await api.get<BookType[]>(
    `${API_ROUTES.BOOKS}?${params || ""}`,
    {
      cache: "no-store",
    }
  );
  const result = dividePaginationBooks(data || []);

  return {
    data: result || [],
    ...rest,
  };
};

export const getBooksByLimit = async (params?: string, limit?: number) => {
  const { data, ...rest } = await api.get<BookType[]>(
    `${API_ROUTES.BOOKS}?${params || ""}page=1`,
    { next: { revalidate: 60 } }
  );

  const result = getTopBook(data || [], limit);

  return {
    data: result || [],
    ...rest,
  };
};

export const getBookById = async (id: string) => {
  const { data, ...rest } = await api.get<BookType>(
    `${API_ROUTES.BOOKS}/${parseInt(id)}`
  );

  return {
    data: (data as BookType) || {},
    ...rest,
  };
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

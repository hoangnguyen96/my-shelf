import { BookType } from "@app/interface";
import { API_ROUTES, DEFAULT_LIMIT } from "@app/constants";
import { api } from "@app/services";
import { dividePaginationBooks } from "@app/utils";

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

export const getBooksByLimit = async (
  paramsSearch?: string,
  limit?: number
) => {
  const { data, ...rest } = await api.get<BookType[]>(
    `${API_ROUTES.BOOKS}?${paramsSearch || ""}orderBy=createdDate&order=desc&page=1&limit=${limit || DEFAULT_LIMIT}`,
    { next: { revalidate: 60 } }
  );

  return {
    data: data || [],
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

import { API_ROUTES } from "@app/constants";
import { User } from "@app/models";
import { api } from "@app/services";

export const getAllUser = async () => {
  const { data, ...rest } = await api.get<User[]>(API_ROUTES.USER);

  return {
    data: data || [],
    ...rest,
  };
};

export const getUserById = async (id: string) => {
  const { data, ...rest } = await api.get<User[]>(
    `${API_ROUTES.USER}?userId=${id}`
  );
  const users = data ?? [];

  return {
    data: users[0] || {},
    ...rest,
  };
};

export const getUserByEmail = async (email: string) => {
  const { data, ...rest } = await api.get<User[]>(`${API_ROUTES.USER}`);
  const users = data ?? [];
  const result = users.find((user) => user.email === email);

  return {
    data: (result as User) ?? {},
    ...rest,
  };
};

export const updateUserById = async (id: string, payload: Partial<User>) => {
  return await api.put(`${API_ROUTES.USER}/${id}`, payload);
};

export const addUser = async (payload: Partial<User>) => {
  return await api.post(API_ROUTES.USER, payload);
};

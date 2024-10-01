import { API_ROUTES, MESSAGES } from "@app/constants";
import { User } from "@app/models";
import { api } from "@app/services";

export const getAllUser = async () => {
  try {
    const data = await api.get<User[]>(API_ROUTES.USER);

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getUserById = async (id: string) => {
  try {
    const data = await api.get<User[]>(`${API_ROUTES.USER}?userId=${id}`);

    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = (await api.get(`${API_ROUTES.USER}?email=${email}`)) as User[];

    return user;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return MESSAGES.RESPONSE_ERROR;
  }
};

export const updateUserById = async (id: string, payload: Partial<User>) => {
  return await api.put(`${API_ROUTES.USER}/${id}`, payload);
};

export const addUser = async (payload: Partial<User>) => {
  return await api.post(API_ROUTES.USER, payload);
};

import { type User } from '@/lib/auth';
import { api } from '.';

type CreateUserData = Pick<User, 'email' | 'name'>;
export const createUser = async (userData: CreateUserData) => {
  try {
    const { data } = await api.post<{ message: string }>(
      '/admin/users',
      userData,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await api.get<{ data: User[] }>('/admin/users');
    return data.data;
  } catch (error) {
    throw error;
  }
};

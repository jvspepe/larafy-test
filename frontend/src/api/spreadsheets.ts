import type { Spreadsheet } from '@/types/spreadsheet';
import { api } from '.';

export const getSpreadsheet = async (id: string) => {
  try {
    const { data } = await api.get<{ data: Spreadsheet }>(
      `/spreadsheets/${id}`,
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSpreadsheets = async () => {
  try {
    const response = await api.get<Spreadsheet[]>('/spreadsheets');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSpreadsheet = async (name: string, data: string) => {
  try {
    const { data: response } = await api.post<{
      message: string;
      data: Spreadsheet;
    }>('/spreadsheets', {
      name,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSpreadsheet = async (
  id: string,
  { name, data }: { name?: string; data?: string },
) => {
  try {
    const { data: response } = await api.put<{
      message: string;
      data: Spreadsheet;
    }>(`/spreadsheets/${id}`, {
      name,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSpreadsheet = async (id: string) => {
  try {
    const { data: response } = await api.delete<{ message: string }>(
      `/spreadsheets/${id}`,
    );

    return response.message;
  } catch (error) {
    throw error;
  }
};

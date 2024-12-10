import { instance } from '.';

export const getCatalogs = async (): Promise<Catalog[]> => {
  try {
    const response = await instance.get(`/catalogs`);
    if (response.data?.isSuccess && response.data.result) {
      return response.data?.result;
    } else {
      throw new Error('Failed to fetch catalogs');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

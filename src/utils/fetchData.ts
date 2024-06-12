import { DataError } from '../models/models';

export async function fetchData<T>(url: string): Promise<T | DataError> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e: any) {
    return new DataError('Something went wrong', e.message);
  }
}

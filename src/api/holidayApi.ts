// src/api/holidayApi.ts
import axios from "axios";
import { Holiday } from "../types/Holiday";

const API_BASE_URL = "https://public-holidays-buildout-backend.onrender.com";

export const fetchCountries = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/countries`);
  return response.data;
};

export const fetchHolidays = async (country: string): Promise<Holiday[]> => {
  const response = await axios.get<Holiday[]>(
    `${API_BASE_URL}/holidays?country=${country}`
  );
  return response.data;
};

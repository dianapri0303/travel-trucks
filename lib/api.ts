import axios from 'axios';
import type {
  CamperListResponse,
  CamperDetails,
  CamperFilters,
  Review,
  FiltersResponse,
  BookingRequest,
  BookingResponse,
} from '@/types/camper';

const DEFAULT_API_BASE_URL = 'https://campers-api.goit.study';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

//GET /campers
export const getCampers = async (
  filters: CamperFilters,
): Promise<CamperListResponse> => {
  const { data } = await api.get<CamperListResponse>('/campers', {
    params: filters,
  });
  return data;
};

// GET /campers/filters
export const getCamperFilters = async (): Promise<FiltersResponse> => {
  const { data } = await api.get<FiltersResponse>('/campers/filters');
  return data;
};

// GET /campers/{camperId}
export const getCamperById = async (
  camperId: string,
): Promise<CamperDetails> => {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
  return data;
};

// GET /campers/{camperId}/reviews
export const getCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

// POST /campers/{camperId}/booking-requests
export const createBooking = async (
  camperId: string,
  body: BookingRequest,
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    body,
  );
  return data;
};

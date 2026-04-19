export type CamperForm =
  | 'alcove'
  | 'panel_van'
  | 'integrated'
  | 'semi_integrated';

export type Transmission = 'automatic' | 'manual';

export type Engine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export type Amenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

// GET /campers
export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmission;
  engine: Engine;
  amenities: Amenity[];
  coverImage: string;
  totalReviews: number;
  description?: string;
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

export interface CamperFilters {
  page?: number;
  perPage?: number;
  location?: string;
  form?: CamperForm;
  transmission?: Transmission;
  engine?: Engine;
}

// GET /campers/{camperId}
export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends CamperListItem {
  description: string;
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

// GET /campers/{camperId}/reviews
export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

// GET /campers/filters
export interface FiltersResponse {
  forms: CamperForm[];
  transmissions: Transmission[];
  engines: Engine[];
}

// POST /campers/{camperId}/booking-requests
export interface BookingRequest {
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}

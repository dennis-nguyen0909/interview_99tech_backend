export interface CustomQuery {
  page?: string;
  limit?: string;
}
export interface ServiceResponse {
  status: number;
  data: any;
  message?: string;
  error?: any;
}

export interface BaseResponse<T> {
  status?: string;
  message?: string;
  data?: T;
  meta?: unknown;
}

export class ApiError extends Error {
  statusCode?: number;
  payload?: unknown;

  constructor(message: string, statusCode?: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

export function isSuccessStatus(status?: string) {
  return status === 'SUCCESS' || status === 'success';
}

import { ApiError, isSuccessStatus, type BaseResponse } from '../types/api';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

interface RequestResult<T> {
  data: T;
  message: string;
  meta?: unknown;
}

async function parseJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError('Server trả về dữ liệu không hợp lệ.', response.status);
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<RequestResult<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...init?.headers,
      },
    });

    const payload = await parseJson<BaseResponse<T>>(response);

    if (!response.ok) {
      throw new ApiError(payload?.message ?? `Yêu cầu thất bại (${response.status}).`, response.status, payload);
    }

    if (payload && payload.status && !isSuccessStatus(payload.status)) {
      throw new ApiError(payload.message ?? 'Server trả về lỗi.', response.status, payload);
    }

    if (!payload) {
      return {
        data: null as T,
        message: 'OK',
      };
    }

    return {
      data: payload.data as T,
      message: payload.message ?? 'OK',
      meta: payload.meta,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError('Không thể kết nối tới backend. Hãy kiểm tra server Spring Boot.', undefined, error);
  }
}

import config from "../config";

const baseURL = `${config.API_URL}`;

export interface HttpResponse<T> {
  data: T;
  status: number;
}

interface HttpClient {
  get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T>(url: string, data: Record<string, string>, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}

const handleResponse = async <T>(response: Response): Promise<HttpResponse<T>> => {
  const responseData = await response.json();
  return {
    data: responseData,
    status: response.status,
  };
};

const applyHeaders = (headers: Record<string, string>) => {
  return headers;
};

export const httpClient: HttpClient = {
  get: async <T>(url: string, headers = {}): Promise<HttpResponse<T>> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: applyHeaders(headers),
    });

    return handleResponse<T>(response);
  },

  post: async <T>(url: string, data: Record<string, string>, headers = {}): Promise<HttpResponse<T>> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: applyHeaders({
        'Content-Type': 'application/json',
        ...headers,
      }),
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  }
};

import { MESSAGES } from "@app/constants";

const API_END_POINT = process.env.NEXT_PUBLIC_API_URL || "";

class HttpService {
  private _apiName: string;

  constructor(api: string) {
    this._apiName = api;
  }

  private async request<T>(
    method: string,
    url: string,
    body?: any
  ): Promise<T> {
    const response = await fetch(`${this._apiName}${url}`, {
      method: method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(MESSAGES.NETWORK_ERROR);
    }

    return response.json();
  }

  async get<T>(url: string): Promise<T> {
    try {
      return await this.request<T>("GET", url);
    } catch (error) {
      throw new Error(MESSAGES.GET_ERROR);
    }
  }

  async post<T>(url: string, body: any): Promise<T> {
    try {
      return await this.request<T>("POST", url, body);
    } catch (error) {
      throw new Error(MESSAGES.POST_ERROR);
    }
  }

  async put<T>(url: string, body: any): Promise<T> {
    try {
      return await this.request<T>("PUT", url, body);
    } catch (error) {
      throw new Error(MESSAGES.UPDATE_ERROR);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      return await this.request<T>("DELETE", url);
    } catch (error) {
      throw new Error(MESSAGES.DELETE_ERROR);
    }
  }
}

export const HttpClient = new HttpService(API_END_POINT);

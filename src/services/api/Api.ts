import { ApiResponse } from 'apisauce';
import BaseApi from './BaseApi';
import { ApiConfig, DEFAULT_API_CONFIG } from './config';

type Response<T> = API.GeneralResponse<T>;

export class Api extends BaseApi {
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    super(config);
  }

  async getFrontPage(
    params: API.GetFrontPage
  ): Promise<Response<API.RES.GetFrontPage>> {
    const response: ApiResponse<any> = await this.api.get(
      `front-page`,
      params,
      {}
    );

    if (!response.ok) return this.handleError(response);

    return { kind: 'ok', data: response.data };
  }
}

export const api = new Api();

export default api;

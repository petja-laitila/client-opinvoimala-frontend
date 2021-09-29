import BaseApi from './BaseApi';
import { ApiConfig, DEFAULT_API_CONFIG } from './config';

type Response<T> = API.GeneralResponse<T>;

export class Api extends BaseApi {
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    super(config);
  }

  /**
   * Fetch app settings (app name, logo etc.)
   */
  async getSettings(
    params: API.GetSettings
  ): Promise<Response<API.RES.GetSettings>> {
    const response = await this.api.get(`settings`, params, {});
    return this.handleResponse(response);
  }

  /**
   * Fetch data for the front page
   */
  async getFrontPage(
    params: API.GetFrontPage
  ): Promise<Response<API.RES.GetFrontPage>> {
    const response = await this.api.get(`front-page`, params, {});
    return this.handleResponse(response);
  }
}

export const api = new Api();

export default api;

import { CreateQueryParams, RequestQueryBuilder } from 'nest-crud-client';
import fetch from '../../helpers/fetch';
export default interface IService<M,T> {
  getById(id:T):Promise<M|null>;
  getAll():Promise<M[]>;
  delete(id:T):Promise<boolean>;
  add(model:M):Promise<M|null>;
  update(id:T,model:M):Promise<M|null>;
};
export interface ResponsePagination<T> {
  datas: Array<T>;
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export class BaseService<M, T>{
  apiUrl: string;
  entity: string;
  constructor(apiUrl: string, entity: string) {
    this.apiUrl = apiUrl;
    this.entity = entity;
  }

  getPagination(
    limit: number, page: number,
    builder?: RequestQueryBuilder<M> | CreateQueryParams<M>): Promise<ResponsePagination<M>> {
    if (!builder) {
      builder = RequestQueryBuilder.create();
    } else if (!(builder instanceof RequestQueryBuilder)) {
      builder = RequestQueryBuilder.create(builder);
    }
    builder.setLimit(limit);
    builder.setPage(page);
    return this.fetch(this.getBaseUrl() + this.getParamsFromQuery(builder), {
      method: 'GET'
    });
  }
  getMany(builder?: RequestQueryBuilder<M> | CreateQueryParams<M>): Promise<M[]> {
    return this.fetch(this.getBaseUrl() + this.getParamsFromQuery(builder), {
      method: 'GET'
    });
  }

  getOne(value: T, builder?: RequestQueryBuilder<M> | CreateQueryParams<M>): Promise<M> {
    const url = this.getOneUrl(value);
    return this.fetch(url + this.getParamsFromQuery(builder), {
      method: 'GET'
    });
  }

  create(body: M): Promise<T> {
    return this.fetch(this.getBaseUrl(), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  createMany(body: M[]): Promise<M[]> {
    return this.fetch(this.getBaseUrl() + '/bulk',
      {
        method: 'POST',
        body: JSON.stringify({ bulk: body }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  put(value: T, body: M): Promise<M> {
    const url = this.getOneUrl(value);
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  patch(value: T, body: M): Promise<M> {
    const url = this.getOneUrl(value);
    return this.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete(value:T): Promise<void> {
    const url = this.getOneUrl(value);
    return this.fetch(url, { method: 'DELETE' });
  }

  protected getParamsFromQuery(builder?: RequestQueryBuilder<M> | CreateQueryParams<M>) {
    if (!builder) return '';
    if (!(builder instanceof RequestQueryBuilder)) {
      builder = RequestQueryBuilder.create(builder);
    }
    return '?' + this.getQuery(builder);
  }

  /**
     * Get request link
     */
  protected getBaseUrl(): string {
    return `${this.apiUrl}/${this.entity}`;
  }

  protected getOneUrl(value: T) {
    return `${this.getBaseUrl()}/${value}`;
  }

  private getQuery(builder?: RequestQueryBuilder<M>) {
    if (builder) {
      return builder.query();
    }
    return '';
  }

  async fetch(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, options);
    return response.data;
  }
}
import { TypeRequest, TypeResponse } from '../enums/type-request.enum';

export interface PostRequest {
  type: TypeRequest.POST;
  body?: Object;
}
export interface DeleteRequest {
  type: TypeRequest.DELETE;
}
export interface GetRequest {
  type: TypeRequest.GET;
}
export interface PutRequest {
  type: TypeRequest.PUT;
  body?: Object;
}

export interface RequestStructure {
  request: PostRequest | DeleteRequest | GetRequest | PutRequest;
  responseType?: TypeResponse;
  endpoint: string;
  externalApi?: boolean;
  params?: { [key: string]: string };
  headers?: { [key: string]: string };
  skipInterceptor?: boolean;
  statusMessages?: StatusMessagesRequest;
}

export interface StatusMessagesRequest {
  loading?: string;
  success?: string;
  error?: string;
  showDefaultErrorMessage?: boolean;
}

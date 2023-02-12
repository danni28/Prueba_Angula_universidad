import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RequestStructure } from '../models/request/request-structure.model';
import { ResponseStructure } from '../models/request/response-structure.model';
import { TypeRequest, TypeResponse } from '../models/enums/type-request.enum';

@Injectable({
  providedIn: 'root',
})
//SERVICIO GENERAL PARA CONSUMIR SERVICIOS API JAVA
export class AppService {
  private headers = new HttpHeaders({
    Accept: 'application/json',
  });
  private params = new HttpParams();

  constructor(
    private _http: HttpClient,
    private _skipInterceptor: HttpBackend
  ) {}

  sentRequest(
    requestStructure: RequestStructure
  ): Observable<ResponseStructure> {
    const http =
      requestStructure.skipInterceptor || requestStructure.externalApi
        ? new HttpClient(this._skipInterceptor)
        : this._http;
    const apiUrl = requestStructure.externalApi
      ? requestStructure.endpoint
      : environment.apiUrlJava + requestStructure.endpoint;
    let response: Observable<Object>;
    this.overwriteParams(requestStructure.params);
    this.overwriteHeaders(requestStructure.headers);

    switch (requestStructure.request.type) {
      case TypeRequest.DELETE:
        switch (requestStructure.responseType) {
          case TypeResponse.ARRAY_BUFFER:
            response = http.delete(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'arraybuffer',
            });
            break;
          case TypeResponse.BLOB:
            response = http.delete(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'blob',
            });
            break;
          case TypeResponse.TEXT:
            response = http.delete(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'text',
            });
            break;
          default:
            response = http.delete(apiUrl, {
              headers: this.headers,
              params: this.params,
            });
            break;
        }
        break;
      case TypeRequest.POST:
        switch (requestStructure.responseType) {
          case TypeResponse.ARRAY_BUFFER:
            response = http.post(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'arraybuffer',
            });
            break;
          case TypeResponse.BLOB:
            response = http.post(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'blob',
            });
            break;
          case TypeResponse.TEXT:
            response = http.post(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'text',
            });
            break;
          default:
            response = http.post(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
            });
            break;
        }
        break;
      case TypeRequest.PUT:
        switch (requestStructure.responseType) {
          case TypeResponse.ARRAY_BUFFER:
            response = http.put(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'arraybuffer',
            });
            break;
          case TypeResponse.BLOB:
            response = http.put(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'blob',
            });
            break;
          case TypeResponse.TEXT:
            response = http.put(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
              responseType: 'text',
            });
            break;
          default:
            response = http.put(apiUrl, requestStructure.request.body, {
              headers: this.headers,
              params: this.params,
            });
            break;
        }
        break;
      default:
        switch (requestStructure.responseType) {
          case TypeResponse.ARRAY_BUFFER:
            response = http.get(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'arraybuffer',
            });
            break;
          case TypeResponse.BLOB:
            response = http.get(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'blob',
            });
            break;
          case TypeResponse.TEXT:
            response = http.get(apiUrl, {
              headers: this.headers,
              params: this.params,
              responseType: 'text',
            });
            break;
          default:
            response = http.get(apiUrl, {
              headers: this.headers,
              params: this.params,
            });
            break;
        }
        break;
    }
    return this.processResponse(
      response
      /* snackBar,
      requestStructure.statusMessages */
    );
  }

  private processResponse(
    response: Observable<Object>
  ): Observable<ResponseStructure> {
    return response.pipe(
      map((resp) => {
        return resp as ResponseStructure;
      }),
      catchError((error: HttpErrorResponse) => {
        let message;
        if (error.status >= 400 && error.status < 500) {
          console.log(error);
          message = error.error?.message;
        } else if (error.status >= 500) {
          console.log(error);
          message = error.error?.message;
        } else {
          message = 'Error desconcido';
          console.log(error);
        }
        throw error;
      })
    );
  }

  private overwriteParams(params: { [key: string]: string } | undefined): void {
    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          this.params = this.params.set(key, params[key]);
        }
      }
    } else {
      this.params = new HttpParams();
    }
  }
  private overwriteHeaders(
    headers: { [key: string]: string } | undefined
  ): void {
    if (headers) {
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          this.headers = this.headers.set(key, headers[key]);
        }
      }
    } else {
      this.headers = new HttpHeaders({
        Accept: 'application/json',
      });
    }
  }
}

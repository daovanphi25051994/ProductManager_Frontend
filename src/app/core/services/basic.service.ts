import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { NotificationService } from './notification.service';
import { CommonUtils } from './common-utils.service';

@Injectable()
export class BasicService {
  public serviceUrl: string;
  public module: string;
  public systemCode: string;
  credentials: any = {};
  /**
   * init service from system code and module
   * config value of app-config.ts
   * param systemCode
   * param module
   */
  constructor(
    @Inject(String) systemCode: string,
    @Inject(String) module: string,
    public httpClient: HttpClient,
    public helperService: HelperService,
    public notificationService?: NotificationService
  ) {
    this.systemCode = systemCode;
    this.module = module;
    const API_URL = this.systemCode;
    const API_PATH = this.module;
    if (!API_URL) {
      console.error(
        `Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`
      );
      return;
    }
    // if (!API_PATH) {
    //   console.error(`Missing config system service config in src/environments/environment.ts => module: ${this.module}`);
    //   return;
    // }
    this.serviceUrl = API_URL + API_PATH;
  }
  /**
   * set SystemCode
   * param systemCode
   */
  public setSystemCode(systemCode: string) {
    this.systemCode = systemCode;
    const API_URL = this.systemCode;
    const API_PATH = this.module;
    if (!API_URL) {
      console.error(
        `Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`
      );
      return;
    }
    // if (!API_PATH) {
    //   console.error(`Missing config system service config in src/environments/environment.ts => module: ${this.module}`);
    //   return;
    // }
    this.serviceUrl = API_URL + API_PATH;
  }

  public search(data?: any): Observable<any> {
    this.credentials = Object.assign({}, data);
    const searchData = CommonUtils.convertData(this.credentials);
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/search`;
    return this.getRequest(url, { params: buildParams });
  }
  /**
   * findAll
   */
  public findAll(paramObj?: any): Observable<any> {
    let httpParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const property in paramObj) {
      httpParams = httpParams.append(property, paramObj[property]);
    }
    const url = `${this.serviceUrl}` + 'get-all';
    return this.getRequest(url, { params: httpParams });
  }

  public findAll1(doctor: any) {
    const url = this.serviceUrl + 'search';
    this.helperService.isProcessing(true);
    return this.postRequest(url, doctor);
  }

  public findAll2(paramObj?: any): Observable<any> {
    let httpParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const property in paramObj) {
      httpParams = httpParams.append(property, paramObj[property]);
    }
    const url = `${this.serviceUrl}` + 'cap-tren';
    return this.getRequest(url, { params: httpParams });
  }
  /**
   * findOne
   * param id
   */
  public findOne(paramObj?: any): Observable<any> {
    let httpParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const property in paramObj) {
      httpParams = httpParams.append(property, paramObj[property]);
    }
    const url = `${this.serviceUrl}` + 'get-detail';
    return this.getRequest(url, { params: httpParams });
  }

  public findOneById(id: number): Observable<any> {
    const url = `${this.serviceUrl}get-by-id/${id}`;
    return this.getRequest(url);
  }

  /**
   * saveOrUpdate
   */
  public saveOrUpdate(item: any): Observable<any> {
    const url = `${this.serviceUrl}`;
    return this.postRequest(url, CommonUtils.convertData(item));
  }
  /**
   * saveOrUpdateFormFile
   */
  public saveOrUpdateFormFile(item: any): Observable<any> {
    const formdata = CommonUtils.convertFormFile(item);
    const url = `${this.serviceUrl}`;
    return this.postRequest(url, formdata);
  }
  /**
   * deleteById
   * param id
   */
  public deleteById(body: any): Observable<any> {
    const url = `${this.serviceUrl}`;
    this.helperService.isProcessing(true);
    return this.deleteBodyRequest(url, body);
  }
  /*******************************/

  /**
   * handleError
   */
  public handleError(error: any) {
    // const errorMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(error);
  }
  /**
   * make get request
   */
  public getRequest(url: string, options?: any): Observable<any> {
    this.helperService.isProcessing(true);
    return this.httpClient.get(url, options).pipe(
      timeout(300000),
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }

  public putRequest(url: string, options?: any): Observable<any> {
    this.helperService.isProcessing(true);
    return this.httpClient.put(url, options).pipe(
      timeout(300000),
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }

  /**
   * make post request
   */
  public postRequest(url: string, data?: any): Observable<any> {
    this.helperService.isProcessing(true);
    return this.httpClient.post(url, data).pipe(
      timeout(300000),
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }
  /**
   * make post request for file
   */
  public postRequestFile(url: string, data?: any): Observable<any> {
    this.helperService.isProcessing(true);
    return this.httpClient.post(url, data, { responseType: 'blob' }).pipe(
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }
  /**
   * make get request
   */
  public deleteRequest(url: string, data?: any): Observable<any> {
    this.helperService.isProcessing(true);
    return this.httpClient.delete(url, data).pipe(
      timeout(300000),
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }
  /**
   * processReturnMessage
   * param data
   */
  public processReturnMessage(data): void {
    // this.helperService.APP_TOAST_MESSAGE.next(data);
  }
  /**
   * request is success
   */
  public requestIsSuccess(data: any): boolean {
    let isSuccess = false;
    if (!data) {
      isSuccess = false;
    }
    // if (data.type === 'SUCCESS' || data.type === 'success') {
    if (data.mess.code === 1) {
      isSuccess = true;
    } else {
      isSuccess = false;
    }
    return isSuccess;
  }
  /**
   * request is success
   */
  public requestIsConfirm(data: any): boolean {
    let isConfirm = false;
    if (!data) {
      isConfirm = false;
    }
    if (data.type === 'CONFIRM') {
      isConfirm = true;
    } else {
      isConfirm = false;
    }
    return isConfirm;
  }
  /**
   * confirmDelete
   */
  public confirmDelete(data): void {
    this.helperService.confirmDelete(data);
  }

  // Delete by body
  public deleteBodyRequest(url: string, data?: any): Observable<any> {
    this.helperService.isProcessing(true);

    return this.httpClient.request('post', url, { body: data }).pipe(
      tap(
        // Log the result or error
        (res: any) => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }

  public forceDelete(data?: any): Observable<any> {
    this.helperService.isProcessing(true);
    const url = this.serviceUrl + 'delete';
    return this.httpClient.request('post', url, { body: data }).pipe(
      tap(
        // Log the result or error
        res => {
          // this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          // this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }

  public searchAll(paramObj?: any): Observable<any> {
    let httpParams = new HttpParams();
    // tslint:disable-next-line: forin
    for (const property in paramObj) {
      httpParams = httpParams.append(property, paramObj[property]);
    }
    const url = `${this.serviceUrl}` + 'search';
    return this.getRequest(url, { params: httpParams });
  }
}

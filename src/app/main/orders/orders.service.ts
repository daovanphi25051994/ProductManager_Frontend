import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiCustomer } from 'app/core/const/prefix-api';
import { BasicService } from 'app/core/services/basic.service';
import { HelperService } from 'app/core/services/helper.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super(
      environment.serverUrl.api_erp,
      environment.API_PATH.BASE_API_PATH + apiCustomer.CUSTOMER,
      httpClient,
      helperService
    );
  }

  search(body: any): Observable<any> {
    const url = this.serviceUrl  + 'search';
    this.helperService.isProcessing(true);
    return this.postRequest(url, body);
  }
}

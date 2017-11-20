import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Campaign } from './campaign';
import { EmeraldAccount } from './emerald-account';

@Injectable()
export class CampaignService {

  BASE_REST_URL = 'http://localhost:8080/sales/campaign/';
  ACCOUNT_URL = 'http://localhost:8080/sales/campaign/account';

  constructor(private http: Http) {
  }

  fetchAllCampaigns(): Observable<Campaign[]> {
    return this.http.get(this.BASE_REST_URL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  fetchAccountBalance(): Observable<EmeraldAccount> {
    return this.http.get(this.ACCOUNT_URL).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  saveCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post(this.BASE_REST_URL, campaign)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteCampaignById(id: number): Observable<boolean> {
    return this.http.delete(this.BASE_REST_URL +  id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateCampaign(id: number, campaign: Campaign): Observable<Campaign> {
     return this.http.put(this.BASE_REST_URL + id, campaign)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

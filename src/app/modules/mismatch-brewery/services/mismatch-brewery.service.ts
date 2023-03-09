import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { urls } from '../../../common/constants/apiList';
@Injectable({
  providedIn: 'root'
})
export class MismatchBreweryService {

  constructor(private api: ApiService) { }

  getMismatchBreweries(type: string,province:string) {
    let url = urls.mismatchBreweries(type, province);
    return this.api.get(url);
  }
}

import { Injectable } from '@angular/core';
import { BreweryRequest, BreweryResult } from 'src/app/common/models/brewery';
import { ApiService } from 'src/app/common/services/api.service';
import { urls } from '../../../common/constants/apiList';
import { LocalStorageService } from '../../../common/services/localStorage.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  constructor(private api: ApiService) { }
  uploadBrewery(request: BreweryRequest[]) {
    let url = urls.breweries;
    let breweries : BreweryResult[] =[];
    return this.api.post(url, request).pipe(map((response) => {      
      if(response) {
        response.forEach(element => {
          let brewery = {
            brewery_name: element.brewery_name,
            street_address: element.street_address,
            city: element.city,
            county_province: element.county_province,
            postal_code: element.postal_code,
            country: element.country,
            brewery_type: element.brewery_type,
            result: element.result
          };
          breweries.push(brewery);
        });
      }    
      return breweries;
    }));
  }
}

import { Injectable } from '@angular/core';
import { BreweryRequest } from 'src/app/common/models/brewery';
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
    let url = urls.brewery;
    let breweryResponse = {
      'status': 'success',
      'code': 200,
      'data': {
        'breweryList': [{
            "name":"360 Degree Brewing Company",	
            "brewery_type" : "micro"	,
            "street" : "Bluebell Business Estate", 
            "city" : "Sheffield Park",
            "county_province":"East Sussex",
            "postal_code":"TN22 3HQ",
            "country":"England",
            "result":"created",
            "message" : "Added successfully"
          },{
            "name":"360 Degree Brewing Company",	
            "brewery_type" : "micro"	,
            "street" : "Bluebell Business Estate", 
            "city" : "Sheffield Park",
            "county_province":"East Sussex",
            "postal_code":"TN22 3HQ",
            "country":"England",
            "result":"created",
            "message" : "Invalid Data"
          }]
      }
    }
    //return this.api.post(url, request)
    return this.api.get('breweries/madtree-brewing-cincinnati').pipe(map((response) => {
            return breweryResponse;
      })
    );
  }
}

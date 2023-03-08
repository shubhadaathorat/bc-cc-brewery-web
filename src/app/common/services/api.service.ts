import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map ,startWith} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { environment } from '../../../environments/environment' 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiEndPoint :string;
  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndpoint;
  }
  private extractData(res: any) {
    let body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };
  
    public get(url) : Observable<any>  {
      return this.http.get(`${this.apiEndPoint}/${url}`,httpOptions).pipe(map(this.extractData),
                            catchError(this.handleError))
    }
    public post(url:string,data: any) : Observable<any> {
      return this.http.post(`${this.apiEndPoint}/${url}`,data,httpOptions).pipe(map(this.extractData),
                              catchError(this.handleError))
    }
    public update(url:string,data: any) : Observable<any>  {
      return this.http.put(`${this.apiEndPoint}/${url}`,data,httpOptions).pipe(map(this.extractData),
                              catchError(this.handleError))
    }
    public delete(url:string) : Observable<any> {
      return this.http.delete(`${this.apiEndPoint}/${url}`,httpOptions).pipe(map(this.extractData),
                                catchError(this.handleError))
    }
    
}

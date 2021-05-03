import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string): Observable<any> {
    /*
    this.http.get(url).subscribe((response) => {
      console.log(response)
    })
    */
    return this.http.get(url)
  }

  postRequest(url: string, data: any, option?: any ): Observable<any> {
    return this.http.post(url, option)
  }
  /*
  updateRequest(url: string, option: HttpHeaders): Observable<any> {
    return ...
  }
  */
}

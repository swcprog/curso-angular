import { Feedback } from './../shared/feedback';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPmsgService: ProcessHttpmsgService) { }


  getFeedbacks(): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(baseURL + "feedback")
    .pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getFeedback(id: string): Observable<Feedback>{
    return this.http.get<Feedback>(baseURL + "feedback" + id)
    .pipe(catchError(this.processHTTPmsgService.handleError));
  }

  putFeedback(feedback: Feedback): Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/' , feedback, httpOptions)
      .pipe(catchError(this.processHTTPmsgService.handleError));
  }

}


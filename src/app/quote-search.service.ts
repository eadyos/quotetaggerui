import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Quote }           from './quote';

@Injectable()
export class QuoteSearchService {

  private quotesApiUrl = "http://localhost:8080/quotes/search";


  constructor(private http: Http) {}

  searchByAuthor(term: string): Observable<Quote[]> {
    return this.http
               .get(`${this.quotesApiUrl}?author=${term}`)
               .map(response => response.json() as Quote[]);
  }
}
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Tag }           from './tag';

@Injectable()
export class TagSearchService {

  private tagsApiUrl = "http://localhost:8080/tags/search";


  constructor(private http: Http) {}

  searchByName(term: string): Observable<Tag[]> {
    return this.http
               .get(`${this.tagsApiUrl}?name=${term}`)
               .map(response => response.json() as Tag[]);
  }
}
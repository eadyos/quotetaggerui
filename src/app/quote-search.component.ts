import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { QuoteSearchService } from './quote-search.service';
import { Quote } from './quote';

@Component({
  selector: 'quote-search',
  templateUrl: './quote-search.component.html',
  styleUrls: [ './quote-search.component.css' ],
  providers: [QuoteSearchService]
})
export class QuoteSearchComponent implements OnInit {
  quotes: Observable<Quote[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private quoteSearchService: QuoteSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.quotes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.quoteSearchService.searchByAuthor(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Quote[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Quote[]>([]);
      });
  }

  gotoDetail(quote: Quote): void {
    let link = ['/detail', quote.id];
    this.router.navigate(link);
  }
}
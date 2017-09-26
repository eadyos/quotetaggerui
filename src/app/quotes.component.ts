import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quote } from './quote';
import { QuoteService } from './quote.service';

// <quote-detail [quote]="selectedQuote"></quote-detail>
  //removed from under ul

@Component({
  selector: 'my-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: [ './quotes.component.css' ]
})

export class QuotesComponent implements OnInit {
  quotes: Quote[];
  selectedQuote: Quote;
  
  constructor(
    private quoteService: QuoteService,
    private router: Router
  ) { }
  
  getQuotes(): void {
    this.quoteService.getQuotes().then(quotes => this.quotes = quotes);
  };

  ngOnInit(): void {
    this.getQuotes();
  }

  onSelect(quote: Quote): void {
  	this.selectedQuote = quote;
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedQuote.id])
  }

  add(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.quoteService.create({text: text, author: 'unknown', id: 0 })
      .then(quote => {
        this.quotes.push(quote);
        this.selectedQuote = null;
      });
  }

  delete(quote: Quote): void {
    this.quoteService
        .delete(quote.id)
        .then(() =>{
          this.quotes = this.quotes.filter(q => q !== quote);
          if (this.selectedQuote === quote) { this.selectedQuote = null; }
        });
  }

}

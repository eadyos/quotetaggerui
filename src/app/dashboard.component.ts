import { Component, OnInit } from '@angular/core';
import { Quote } from './quote';
import { Tag } from './tag';
import { QuoteService } from './quote.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit { 
	quotes : Quote[] = [];
  randomQuote : Quote;
  randomQuoteTags : Tag[];

	constructor(private quoteService: QuoteService) { }

	ngOnInit(): void {
    this.quoteService.getRandomQuote()
        .then((quote) =>{
            this.randomQuote = quote;
            this.quoteService.getTags(quote.id).then(tags => this.randomQuoteTags = tags);
        });

    	// this.quoteService.getQuotes()
     //  		.then(quotes => this.quotes = quotes.slice(1, 5)
     //  			);
  	}
}
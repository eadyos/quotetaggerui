import { Component, OnInit } from '@angular/core';
import { Quote } from './quote';
import { QuoteService } from './quote.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit { 
	quotes : Quote[] = [];

	constructor(private quoteService: QuoteService) { }

	ngOnInit(): void {
    	this.quoteService.getQuotes()
      		.then(quotes => this.quotes = quotes.slice(1, 5)
      			);
  	}
}
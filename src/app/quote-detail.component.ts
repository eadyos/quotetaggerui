import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { QuoteService } from './quote.service';
import { Quote } from './quote';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: [ './quote-detail.component.css' ]
})
export class QuoteDetailComponent implements OnInit {

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  quote : Quote;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.quoteService.getQuote(+params.get('id')))
      .subscribe(quote => this.quote = quote);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quoteService.update(this.quote)
      .then(() => this.goBack());
  }

}
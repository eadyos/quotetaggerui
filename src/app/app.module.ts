import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //<--NgModel lives here
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { QuoteDetailComponent } from './quote-detail.component';
import { TagDetailComponent } from './tag-detail.component';
import { QuoteSearchComponent } from './quote-search.component';
import { QuotesComponent } from './quotes.component';
import { TagsComponent } from './tags.component';
import { QuoteService } from './quote.service';
import { TagService } from './tag.service';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule, //Import the FormsModule before binding with [(ngModel)]
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    QuoteDetailComponent,
    QuotesComponent,
    DashboardComponent,
    QuoteSearchComponent,
    TagsComponent,
    TagDetailComponent
  ],
  providers: [
    QuoteService, 
    TagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

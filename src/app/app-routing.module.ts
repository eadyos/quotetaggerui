import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { QuotesComponent }      from './quotes.component';
import { TagsComponent }      	from './tags.component';
import { QuoteDetailComponent }  from './quote-detail.component';
import { TagDetailComponent }  from './tag-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'quotedetail/:id', component: QuoteDetailComponent },
  { path: 'tagdetail/:id', component: TagDetailComponent },
  { path: 'quotes',     component: QuotesComponent },
  { path: 'tags',     	component: TagsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Quote } from './quote';


@Injectable()
export class QuoteService {

	private quotesApiUrl = "http://localhost:8080/quotes";

	constructor(private http: Http){ }

	getQuotes(): Promise<Quote[]>{
		return this.http.get(this.quotesApiUrl)
			.toPromise()
			.then(response => response.json() as Quote[])
			.catch(this.handleError);
	}

	getQuote(id: number): Promise<Quote> {
		const url = `${this.quotesApiUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Quote)
			.catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	update(quote: Quote): Promise<Quote> {
	  const url = `${this.quotesApiUrl}/${quote.id}`;
	  return this.http
	    .put(url, JSON.stringify(quote), {headers: this.headers})
	    .toPromise()
	    .then(() => quote)
	    .catch(this.handleError);
	}

	create(quote: Quote): Promise<Quote> {
	  	return this.http
		    .post(this.quotesApiUrl, JSON.stringify(quote), {headers: this.headers})
		    .toPromise()
			.then(res => res.json() as Quote)
		    .catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.quotesApiUrl}/${id}`;
		return this.http
			.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error); 
		return Promise.reject(error.message || error);
	}

}
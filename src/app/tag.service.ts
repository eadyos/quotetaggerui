import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Tag } from './tag';


@Injectable()
export class TagService {

	private tagsApiUrl = "https://afternoon-bayou-23485.herokuapp.com/tags";

	constructor(private http: Http){ }

	getTags(): Promise<Tag[]>{
		return this.http.get(this.tagsApiUrl)
			.toPromise()
			.then(response => response.json() as Tag[])
			.catch(this.handleError);
	}

	getTag(id: number): Promise<Tag> {
		const url = `${this.tagsApiUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Tag)
			.catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	update(tag: Tag): Promise<Tag> {
	  const url = `${this.tagsApiUrl}/${tag.id}`;
	  return this.http
	    .put(url, JSON.stringify(tag), {headers: this.headers})
	    .toPromise()
	    .then(() => tag)
	    .catch(this.handleError);
	}

	create(tag: Tag): Promise<Tag> {
	  	return this.http
		    .post(this.tagsApiUrl, JSON.stringify(tag), {headers: this.headers})
		    .toPromise()
			.then(res => res.json() as Tag)
		    .catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.tagsApiUrl}/${id}`;
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
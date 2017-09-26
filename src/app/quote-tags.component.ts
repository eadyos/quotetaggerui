import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuoteService } from './quote.service';
import { TagService } from './tag.service';
import { TagSearchService } from './tag-search.service';
import { Tag } from './tag';
import 'rxjs/add/operator/switchMap';
import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';



@Component({
  selector: 'quote-tags',
  templateUrl: './quote-tags.component.html',
  styleUrls: [ './quote-tags.component.css' ],
  providers: [TagSearchService]
})
export class QuoteTagsComponent implements OnInit {

  @Input() quoteId :number;

  tags : Tag[];
  tagSearchResults : Observable<Tag[]>;
  private searchTerms = new Subject<string>();


  constructor(
    private quoteService: QuoteService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private tagSearchService: TagSearchService
  ){}


  ngOnInit(): void {
	  this.getTags();
    this.tagSearchResults = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.tagSearchService.searchByName(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Tag[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Tag[]>([]);
      });
  }

  getTags(): void {
	  this.quoteService.getTags(this.quoteId).then(tags => this.tags = tags);
  };

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  select(tag: Tag): void {
    this.quoteService.addTag(this.quoteId, tag);
    this.searchTerms.next(null); //Probably not the right way to do this
    if(!this.tags.some(t=>t.id == tag.id)){
      this.tags.push(tag);
    }
  }

  addTag(text: string): void {
    text = text.trim();
    if (!text) { return; }
    var newTag: Tag = {id:0, name: text, description: ''}
    var createdTag: Tag;
    this.tagService.create(newTag)
      .then(tag => this.select(tag)) 
  }

  deleteTag(tag: Tag): void {
    this.quoteService
        .deleteTag(this.quoteId, tag)
        .then(() =>{
          this.tags = this.tags.filter(q => q !== tag);
        });
  }



}
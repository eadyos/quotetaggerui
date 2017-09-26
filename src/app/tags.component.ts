import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tag } from './tag';
import { TagService } from './tag.service';

// <quote-detail [quote]="selectedQuote"></quote-detail>
  //removed from under ul

@Component({
  selector: 'my-tags',
  templateUrl: './tags.component.html',
  styleUrls: [ './tags.component.css' ]
})

export class TagsComponent implements OnInit {
  tags: Tag[];
  selectedTag: Tag;
  
  constructor(
    private tagService: TagService,
    private router: Router
  ) { }
  
  getTags(): void {
    this.tagService.getTags().then(tags => this.tags = tags);
  };

  ngOnInit(): void {
    this.getTags();
  }

  onSelect(tag: Tag): void {
  	this.selectedTag = tag;
  };

  gotoDetail(): void {
    this.router.navigate(['/tagdetail', this.selectedTag.id])
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tagService.create({name: name, description: '', id: 0 })
      .then(tag => {
        this.tags.push(tag);
        this.selectedTag = null;
      });
  }

  delete(tag: Tag): void {
    this.tagService
        .delete(tag.id)
        .then(() =>{
          this.tags = this.tags.filter(t => t !== tag);
          if (this.selectedTag === tag) { this.selectedTag = null; }
        });
  }

}

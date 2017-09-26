import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TagService } from './tag.service';
import { Tag } from './tag';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: [ './tag-detail.component.css' ]
})
export class TagDetailComponent implements OnInit {

  constructor(
    private tagService: TagService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  tag : Tag;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tagService.getTag(+params.get('id')))
      .subscribe(tag => this.tag = tag);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.tagService.update(this.tag)
      .then(() => this.goBack());
  }

}
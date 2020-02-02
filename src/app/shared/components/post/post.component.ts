import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../admin/shared/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;

  constructor() { }

}

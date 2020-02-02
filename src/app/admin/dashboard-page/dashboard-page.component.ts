import { Component, OnDestroy, OnInit } from '@angular/core';
// -----------------------------------------
import { Subscription } from 'rxjs';
// -----------------------------------------
import { PostService } from '../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubs$: Subscription;
  searchStr = '';
  delSubs$: Subscription;

  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.postsSubs$ = this.postService.getAll().subscribe( (posts) => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.delSubs$ = this.postService.delete(id).subscribe( () => {
      this.posts = this.posts.filter( post => post.id !== id);
      this.alertService.danger('Post was deleted!');
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubs$) {
      this.postsSubs$.unsubscribe();
    }

    if (this.delSubs$) {
      this.delSubs$.unsubscribe();
    }
  }


}

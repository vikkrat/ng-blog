import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// ---------------------------------
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
// ---------------------------------
import { PostService } from '../shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSubs$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      })
    ).subscribe( (post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubs$ = this.postService.update( {
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe( () => {
      this.submitted = false;
      this.alertService.warning('Post was updated!');
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubs$) {
      this.updateSubs$.unsubscribe();
    }
  }
}

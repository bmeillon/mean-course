import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post} from '../post.model';
import { PostsService } from '../post.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


  constructor(public postsService: PostsService) {

  }

  /* posts = [
    {title: 'First Post', content: 'gfdfgdf'},
    {title: 'Bernardo Post', content: 'dfggdfgdf'},
    {title: 'DASD Post', content: 'gdfgdfg'},
    {title: 'DFGDF Post', content: 'erqwqDASDS'},

  ] */

  /* @Input() posts: Post[] = []; */
  posts: Post[] = [];

  private postsSub: Subscription;

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts();


    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts) => {
      this.posts = posts;
    });


  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}

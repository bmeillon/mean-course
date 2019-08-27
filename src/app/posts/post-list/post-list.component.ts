import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post} from '../post.model';
import { PostsService } from '../post.service';
import { Subscription} from 'rxjs';
import { PageEvent } from '@angular/material';

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

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2 , 5, 10];
  private postsSub: Subscription;

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: { posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }


  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}

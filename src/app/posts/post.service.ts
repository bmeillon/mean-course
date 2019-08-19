import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();




  getPosts() {

    return [...this.posts];
  }

  // Using subjects
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};

    this.posts.push(post);
    // After added update your posts
    this.postsUpdated.next([...this.posts]);
  }
}

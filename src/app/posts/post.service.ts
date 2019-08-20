import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postDataApi) => {
        this.posts = postDataApi.posts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  // Using subjects
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};


    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      // After added update your posts
      this.postsUpdated.next([...this.posts]);
    });
  }
}

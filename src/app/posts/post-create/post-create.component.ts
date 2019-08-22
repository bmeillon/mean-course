import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Post} from '../post.model';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  enteredContent = '';
  enteredTitle = '';
  post: Post;

  private mode = 'create';
  private postId: string;


  constructor(public postService: PostsService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = { id: postData._id,
                        title: postData.title,
                        content: postData.content}
        });
      } else {
        this.mode = 'create';
        this.postId = null;

      }
    });
  }

  /* @Output() postCreated = new EventEmitter<Post>(); */

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create'){
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }


    form.resetForm();

    /* const post: Post = {
      title: form.value.title,
      content: form.value.content
    } */

    /* this.postCreated.emit(post); */
  }
}

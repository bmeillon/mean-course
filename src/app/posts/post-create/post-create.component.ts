import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Post} from '../post.model';
import { PostsService } from '../post.service';

@Component({
  templateUrl: './post-create.component.html',
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  enteredContent = '';
  enteredTitle = '';

  constructor(public postService: PostsService) {}

  /* @Output() postCreated = new EventEmitter<Post>(); */

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();

    /* const post: Post = {
      title: form.value.title,
      content: form.value.content
    } */

    /* this.postCreated.emit(post); */
  }
}

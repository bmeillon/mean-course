import { RouterModule, Routes, Router} from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'create', component: PostCreateComponent},
  { path: 'edit/:postId', component: PostCreateComponent},
  { path: 'login', component: LoginComponent}
 ];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })

 export class AppRoutingModule { }

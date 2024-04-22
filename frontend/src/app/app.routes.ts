import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((c) => c.SearchComponent),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./pages/team/team.component').then((c) => c.TeamComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((c) => c.ContactComponent),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blogs/blogs.component').then((c) => c.BlogsComponent),
  },
  {
    path: 'create-post',

    loadComponent: () =>
      import('./pages/create-post/create-post.component').then(
        (c) => c.CreatePostComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'edit-post/:id',

    loadComponent: () =>
      import('./pages/edit-post/edit-post.component').then(
        (c) => c.EditPostComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'post-details/:id',
    loadComponent: () =>
      import('./pages/post-details/post-details.component').then(
        (c) => c.PostDetailsComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];

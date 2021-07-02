import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentaryMoviePage } from './commentary-movie.page';

const routes: Routes = [
  {
    path: '',
    component: CommentaryMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentaryMoviePageRoutingModule {}

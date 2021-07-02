import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentaryMoviePageRoutingModule } from './commentary-movie-routing.module';

import { CommentaryMoviePage } from './commentary-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentaryMoviePageRoutingModule
  ],
  declarations: [CommentaryMoviePage]
})
export class CommentaryMoviePageModule {}

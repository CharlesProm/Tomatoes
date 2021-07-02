import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingMoviePageRoutingModule } from './rating-movie-routing.module';

import { RatingMoviePage } from './rating-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingMoviePageRoutingModule
  ],
  declarations: [RatingMoviePage]
})
export class RatingMoviePageModule {}

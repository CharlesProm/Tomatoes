import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpMovieService } from 'src/app/api/http-movie/http-movie.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-rating-movie',
  templateUrl: './rating-movie.page.html',
  styleUrls: ['./rating-movie.page.scss'],
})
export class RatingMoviePage implements OnInit {

  @Input() movie;
  rating = null;
  constructor(
    private modalCtrl: ModalController,
    private httpMovie: HttpMovieService,
    private session: SessionService
  ) { }

  ngOnInit() {
    console.log(this.movie)
  }

  addRating(){
    this.httpMovie.addRating({ user: this.session.user, movie: this.movie.id, rating: this.rating })
    .subscribe(data => {
      console.log(data);
      if (data.status >= 200 && data.status < 300) {
        this.modalCtrl.dismiss()

      } else {
      }

    }, error => {
      console.log(error);
    });

  }

  cancel(){
    this.modalCtrl.dismiss()
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpMovieService } from 'src/app/api/http-movie/http-movie.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CommentaryMoviePage } from '../modal/commentary-movie/commentary-movie.page';
import { RatingMoviePage } from '../modal/rating-movie/rating-movie.page';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {
  movies = []
  urlApi = `http://image.tmdb.org/t/p/w185`;
  constructor(
    private httpMovieService: HttpMovieService,
    private modalCtrl: ModalController,
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFavouriteMovie()
  }

  getFavouriteMovie(){
    this.httpMovieService.getFavouriteMovie(this.session.user.id_user).subscribe(data =>{
      console.log(data)
      this.movies = data.response
    }, error =>{
      console.log(error)
    })
  }

  async ratingAudience(movie){
    const modal = await this.modalCtrl.create({
      component: RatingMoviePage,
      componentProps: {
        movie:movie
      }
    });

    await modal.present()
}

async commentarys(movie){
  const modal = await this.modalCtrl.create({
    component: CommentaryMoviePage,
    componentProps: {
      movie:movie
    }
  });

  await modal.present()
}

logout(){
  this.router.navigateByUrl('/', {replaceUrl:true});
}


}

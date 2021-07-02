import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpMovieService } from 'src/app/api/http-movie/http-movie.service';
import { SessionService } from 'src/app/services/session/session.service';
import { CommentaryMoviePage } from '../modal/commentary-movie/commentary-movie.page';
import { RatingMoviePage } from '../modal/rating-movie/rating-movie.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  urlApi = 'http://image.tmdb.org/t/p/w185'
  movies = [];
  constructor(
    private httpMovieService: HttpMovieService,
    private modalCtrl: ModalController,
    private session: SessionService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getPopularMovies()
  }

  getPopularMovies(){
    this.httpMovieService.getPopularMovies().subscribe(data =>{
      console.log(data)
      this.movies = data.response.results
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

addFavourite(movie){
    
    this.httpMovieService.addFavourite({movie: movie, user: this.session.user.id_user}).subscribe(data =>{
      this.presentAlert('Pelicula favorita', data.response)
    }, error =>{
      console.log(error)
    })
  }

  logout(){
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }


}

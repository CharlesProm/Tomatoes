import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpCommentaryService } from 'src/app/api/http-commentary/http-commentary.service';
import { SessionService } from 'src/app/services/session/session.service';


@Component({
  selector: 'app-commentary-movie',
  templateUrl: './commentary-movie.page.html',
  styleUrls: ['./commentary-movie.page.scss'],
})
export class CommentaryMoviePage implements OnInit {

  @Input() movie;
  commentaryes = []
  commentary
  constructor(
    private modalCtrl: ModalController,
    private httpCommentary: HttpCommentaryService,
    private session: SessionService,
  ) { }

  ngOnInit() {
    console.log(this.movie)
    this.httpCommentary.getCommentary({movie:this.movie.id})
    .subscribe(data => {
      console.log(data);
      if (data.status >= 200 && data.status < 300) {
        this.commentaryes = data.response
      } else {
      }

    }, error => {
      console.log(error);
    });
  }

  addCommentary() {

    console.log("addCommentary")
    this.httpCommentary.addCommentary({ user: this.session.user, movie: this.movie.id, descrip: this.commentary })
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

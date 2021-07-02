import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpProfileService } from 'src/app/api/http-profile/http-profile.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user = {
    id_user:'',
    username:'',
    name:'',
    lastname:'',
    email:'',
    password:'',
  }

  constructor(
    private httpProfile: HttpProfileService,
    private session: SessionService,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.httpProfile.getProfile({user: 1})
    .subscribe(data => {
      console.log(data);
      if (data.status >= 200 && data.status < 300) {
        this.user = data.response
      }else{
      }

    }, error => {
      console.log(error);
    });
  }

  updateProfile(){
      this.httpProfile.updateProfile(this.user)
        .subscribe(data => {
          if (data.status >= 200 && data.status < 300) {
            this.presentAlert("Actualización de datos", "Sus dados se han actualizado exitosamente")
          }else{
          }

        }, error => {
          console.log(error);
        });
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

  logout(){
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpLoginService } from 'src/app/api/http-login/http-login.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    username:'',
    password:''
  }  

  constructor(
    private httpLogin: HttpLoginService,
    private router: Router,
    private session: SessionService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }


  login() {
    console.log("menu")
    // this.router.navigateByUrl('/menu', {replaceUrl:true});
      if(this.user.password == '' && this.user.username == ''){
        console.log("Por favor complete el formulario")
        return
      }
      this.httpLogin.login(this.user)
        .subscribe(data => {
          console.log(data);
          if (data.status >= 200 && data.status < 300) {
            this.session.user = data.response
            this.router.navigateByUrl('/menu', {replaceUrl:true});
          }else{
            this.presentAlert("Los datos ingresados son inválidos", data.response)
          }

        }, error => {
          console.log(error);
        });

  }

  signupPage(){
    this.router.navigateByUrl('/signup', {replaceUrl:true});
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
    console.log('onDidDismiss resolved with role', role);
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSignupService } from 'src/app/api/http-signup/http-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {
    username:'',
    name:'',
    lastname:'',
    email:'',
    password:'',
    passwordConfirm:''
  }

  constructor(
    private httpSignup: HttpSignupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(){
    // this.router.navigateByUrl('/', {replaceUrl:true});
    console.log("signup")
    if(this.user.passwordConfirm != '' && this.user.password != '' && this.user.password == this.user.passwordConfirm){
      this.httpSignup.signup(this.user)
        .subscribe(data => {
          console.log(data);
          if (data.status >= 200 && data.status < 300) {
           
            this.router.navigateByUrl('/', {replaceUrl:true});
          }else{
          }

        }, error => {
          console.log(error);
        });
    }
      
  }

  cancel(){
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

}

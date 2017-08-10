import { ElementRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'calisan-giris-comp',
  templateUrl: './calisan.giris.component.html',
  styleUrls: ['./calisan.giris.component.css']
})
export class CalisanGirisComponent {
  
    model: any = {};
    loading = false;
    returnUrl: string = "/is-arayan-profil";
    cities: any;
    apiResponse: any;
    fields: any;
    wrong: any=false;
    loginState: any=1;
    notequal: any=false;

  constructor(
  	private _authService: AuthService,
  	private route: ActivatedRoute,
    private router: Router,
    private _pub: Pub,
    private _post: PostService
  	) { 

  }
  ngOnInit() {
	    //this.cities = this._authService.login('saygin.savran@cboxprojects.com', 'qwerty')
	    //console.log(this.cities);
      //this.fields = this._pub.getFieldList().then(res => this.fields = res);
	}
  login() {
        this.loading = true;
        this._authService.login(this.model.username, this.model.password, this.returnUrl, "member").then(res => this.getMessage());
  }
  getMessage(){
    this.wrong = true;
    this.loading = false;
  }
  setState(state){
    this.loginState = state;
  }

  responser(obj) {
      if(obj.code === 200){
        return true;
      }else{
        return false;
      }
  }


  // OLD USER 
  checkIsOldUser(fav: NgForm) {
    
  
    let uri = '/calisan-giris';
    let oldModel = { "p_mobile": fav.value.oldtel.toString(), "p_old_password": fav.value.oldpass, "p_email": fav.value.oldmail, "p_pwd": fav.value.newpass }

    console.log(fav.value.oldtel, fav.value.oldmail, fav.value.oldpass, fav.value.newpass, fav.value.newpass2);

    if(fav.value.newpass===fav.value.newpass2){

      this._post.activateOldAccount(oldModel).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              location.reload();
            }else{
              //give a message
              console.log(success);
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
    }else{
      this.notequal = true;
    }
    
  }
}
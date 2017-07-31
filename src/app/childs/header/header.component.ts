import { Component } from '@angular/core';
import {AppSettings} from '../../config/app.settings';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import {Comment} from '../../models/comment'

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Never Back Down';
  fields: any;
  ex: any;
  obj: any;
  checkUser: any;
  islogged: any= false;
  
  constructor(private _pub: Pub, private _auth: AuthService, private router: Router) {
    

    if(this._auth.refreshToken() && this._auth.isLoggedIn()){
        this._auth.logout();
    }
    this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member');
  }  
  ngOnInit() {
  	this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));
    this.checkUser = this._auth.isLoggedIn();
    
  }
  

  logOut() {
    this._auth.logout();
  }

  formatFields(f) {
    	this.obj = {};
    	if(f.data){
  	  	for (let items of f.data) {
  	  		this.obj[items.ITEM] = items.TEXT
  		}
  	}
  	return this.obj;
  }
  goMyProfile(){
    if(this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business'){
      this.router.navigate(['/is-veren-profil']);
    }else if(this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member'){
      this.router.navigate(['/is-arayan-profil']);
    }else{
      this._auth.logout();
    }
  }
  checkPerson(){
    this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member');
    console.log(this.islogged);
    if(!this.islogged){
      this.router.navigate(['/calisan-arama']);
    }else{
      this.router.navigate(['/isveren-giris']);
    }
  }
  
}
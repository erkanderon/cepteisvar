import { Component } from '@angular/core';
import {AppSettings} from '../../config/app.settings';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import {Comment} from '../../models/comment'

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [Pub, AuthService]
})
export class HeaderComponent {
  title = 'Never Back Down';
  fields: any;
  ex: any;
  obj: any;
  checkUser: any;
  
  constructor(private _pub: Pub, private _auth: AuthService) {
    

    if(this._auth.refreshToken() && this._auth.isLoggedIn()){
        this._auth.logout();
    }
  }  
  ngOnInit() {
  	this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));
    this.checkUser = this._auth.isLoggedIn();
    
  }
  ngAfterViewInit() {
  	
  	/*setTimeout(()=>{   
	      
	 },9000);*/
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
  
}
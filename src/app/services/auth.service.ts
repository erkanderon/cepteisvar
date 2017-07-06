import { Injectable } from '@angular/core';
import {AppSettings} from '../config/app.settings';
import {Headers ,Http, URLSearchParams, RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	
	private loggedIn = false;
	private username = "";
	date1: any;
	date2: any;
	

	constructor(private http: Http, private router: Router,) { 
		this.loggedIn = !!localStorage.getItem('user_access_token');
		this.username = localStorage.getItem("user")
	}

	login(username, password) {
		var headers = new Headers();
    	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let body = new URLSearchParams();
	    body.set('grant_type', AppSettings.grant_type);
	    body.set('client_id', AppSettings.client_id);
	    body.set('client_secret', AppSettings.client_secret);
	    body.set('username', username);
	    body.set('password', password);
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/member/oauth/token', body, {headers})
	    .toPromise()
	      .then(response => response.json())
	      .then(
			   //used Arrow function here
			   (success)=> {
			      
			      localStorage.setItem("user_access_token", success.access_token);
			      localStorage.setItem("user_refresh_token", success.refresh_token);
			      localStorage.setItem("user_token_type", success.token_type);
			      localStorage.setItem("timestamp", new Date().toString());
			      localStorage.setItem("user", username);
			      this.router.navigate(['/is-arayan-profil']);
			   }
			).catch(
			   //used Arrow function here
			   (err)=> {
			      console.log(err);
			      this.router.navigate(['/home']);
			   }
			)
	}
	logout() {
    	localStorage.removeItem('user_access_token');
    	localStorage.removeItem('user_refresh_token');
    	localStorage.removeItem('user_token_type');
    	this.loggedIn = false;
    }

    isLoggedIn() {
    	return this.loggedIn;
    }
    getUser() {
    	return this.username;
    }
    checkIsExpired() {
    	this.date1 = new Date();
    	this.date2 = new Date(localStorage.getItem("timestamp"));

    	if(this.date1-this.date2 > AppSettings.ten_minutes && this.date1-this.date2 < AppSettings.fifteen_minutes){
    		return true;
    	}else if(this.date1-this.date2 <= AppSettings.ten_minutes){
    		return 1;
    	}else{
    		return false;
    	}
    }
    refreshToken() {
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let body = new URLSearchParams();
	    body.set('grant_type', AppSettings.grant_type2);
	    body.set('client_id', AppSettings.client_id);
	    body.set('client_secret', AppSettings.client_secret);
	    body.set('refresh_token', localStorage.getItem("user_refresh_token"));
	    console.log(body);
    	if (this.checkIsExpired()===true){
    		this.http.post(AppSettings.API_ENDPOINT+'/refresh/oauth/token', body, {headers})
		    .toPromise()
		      .then(response => response.json())
		      .then(
				   //used Arrow function here
				   (success)=> {
				      
				      localStorage.setItem("user_access_token", success.access_token);
				      localStorage.setItem("user_refresh_token", success.refresh_token);
				      localStorage.setItem("user_token_type", success.token_type);
				      localStorage.setItem("timestamp", new Date().toString());
				      
				      return "Sonane oglim";
				   }
				).catch(
				   //used Arrow function here
				   (err)=> {
				      console.log(err);
				      //this.router.navigate(['/home']);
				   }
				)
    	}else if(this.checkIsExpired()===false){
    		//this.router.navigate(['/home']);
    		return true;
    	}else{
    		return false;
    	}
    }
	private handleError(error: any): Promise<any> {
	    
	    return Promise.reject(error.message || error);
	}
}
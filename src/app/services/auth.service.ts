import { Injectable } from '@angular/core';
import {AppSettings} from '../config/app.settings';
import {Headers ,Http, URLSearchParams, RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateUserLoginModel } from '../models/updateUserLogInfo.model';
import { PreviewMemberModel } from '../models/previewMemberAccount.model';
import { PreviewCompanyModel } from '../models/previewCompanyAccount.model';
import { PostService } from './post.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	
	private loggedIn = false;
	private currentUser: { P_LOGIN_TYPE : 1};
	private username = "";
	date1: any;
	date2: any;

	member:any;
	company: any;
	

	constructor(private http: Http, private router: Router,private _post: PostService) { 
		//this.loggedIn = !!localStorage.getItem('user_access_token');
		this.loggedIn = !this.refreshToken();
		this.username = localStorage.getItem("user")
	}

	login(username, password, uri, role) {
		var headers = new Headers();
    	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let body = new URLSearchParams();
	    body.set('grant_type', AppSettings.grant_type);
	    body.set('client_id', AppSettings.client_id);
	    body.set('client_secret', AppSettings.client_secret);
	    body.set('username', username);
	    body.set('password', password);

	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/' + role +'/oauth/token', body, {headers})
	    .toPromise()
	      .then(response => response.json())
	      .then(
			   //used Arrow function here
			   (success)=> {
			      console.log(success);
			      localStorage.setItem("user_access_token", success.access_token);
			      localStorage.setItem("user_refresh_token", success.refresh_token);
			      localStorage.setItem("user_token_type", success.token_type);
			      localStorage.setItem("timestamp", new Date().toString());
			      localStorage.setItem("user", username);
			      localStorage.setItem("userrole", role);

			      this.updateUser(success, role);

			      this.router.navigate([uri, {foo: "profil"}]);
			   }
			).catch(
			   //used Arrow function here
			   (err)=> {
			      return err;
			   }
			)
	}
	logout() {
		
    	localStorage.removeItem('user_access_token');
    	localStorage.removeItem('user_refresh_token');
    	localStorage.removeItem('user_token_type');
    	localStorage.removeItem('user');
    	localStorage.removeItem('timestamp');
    	localStorage.removeItem('userrole');
    	this.loggedIn = false;
    	
    	
    	this.router.navigate(['/home']);
    	location.reload();
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
    		return 2;
    	}else if(this.date1-this.date2 <= AppSettings.ten_minutes){
    		return 1;
    	}else{
    		return 0;
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
    	if (this.checkIsExpired()===2){
		
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
				      console.log("refreshed");
				      return false;
				   }
				).catch(
				   //used Arrow function here
				   (err)=> {
				      console.log(err);
				      //this.logout();
				      
				   }
				)
    	}else if(this.checkIsExpired()===1){
    		return false;
    	}else{
    		return true;
    	}
    }
    // UPDATE USER LOGINFO
	updateUserLogin(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/change-account-password?access_token='+token, param, options)
	    .toPromise()
	      .then(response => response.json())
	      .then(
			    //used Arrow function here
			    (success)=> {
			      
			      return success;
			    }
			).catch(
			   //used Arrow function here
			   (err)=> {
			   console.log(param)
			      console.log(err);
			   }
			)

	}

	updateUser(res, role){
		if(role==="member"){
			this.member = new PreviewMemberModel(localStorage.getItem('user'));
    		this._post.previewMemberAccount(JSON.stringify(this.member)).then(res => this.updateUserLogin({"p_userid": res.data[0].USER_ID, "P_GROUP_ID": res.data[0].GROUP_ID, "P_SESSION_ID": this.generateId(res.data[0].USER_ID, res.data[0].GROUP_ID), "P_LOGIN_TYPE": 0 }));
		}else{
			this.company = new PreviewCompanyModel(localStorage.getItem('user'));
			this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.updateUserLogin({ "p_userid": res.data[0].COMPANY_ID, "P_GROUP_ID": res.data[0].GROUP_ID, "P_SESSION_ID": this.generateId(res.data[0].COMPANY_ID, res.data[0].GROUP_ID), "P_LOGIN_TYPE": 0 }));
		}
		
	}

	generateId(userid, groupid){
		return userid + "-" + groupid + "-" + (Math.floor(Math.random() * 20000) + 1)
	}
	
	private handleError(error: any): Promise<any> {
	    
	    return Promise.reject(error.message || error);
	}
}
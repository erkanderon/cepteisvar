import { Injectable } from '@angular/core';
import {AppSettings} from '../config/app.settings';
import {Headers ,Http , RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Return} from '../models/return.model'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PostService {

	constructor(private http: Http) { }


	insertNewCompanyAccount(param) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/signup-company-account', param, options)
	    .toPromise()
	      .then(response => response.json())
	      .then(
			    //used Arrow function here
			    (success)=> {
			      
			      console.log(success)
			    }
			).catch(
			   //used Arrow function here
			   (err)=> {
			      console.log(err);
			   }
			)

	}
	insertNewMemberAccount(param) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/signup-member-account', param, options)
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
			      console.log(err);
			   }
			)

	}
	// PREVIEW MEMBER ACCOUNT
	previewMemberAccount(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/preview-member-account-info-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	// PREVIEW COMPANY ACCOUNT
	previewCompanyAccount(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/preview-company-account-info-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}

	// EDIT USER
	editMemberAccount(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/edit-member-account-info-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	// EDIT COMPANY
	editCompanyAccount(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/edit-company-account-info-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	// GET USER COMMENTS
	getMemberComments(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-user-comments-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	// GET COMPANY COMMENTS
	getCompanyComments(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-company-comments?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	// GET USER SMS
	getMemberSMS(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-user-sms-list-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}
	
	// CHANGE PASSWORD
	changePassword(param): Promise<any> {
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
			      console.log(err);
			   }
			)

	}
	
	// CHANGE PRIMARY JOB
	changeJob(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/edit-member-job-info-owner?access_token='+token, param, options)
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
			      console.log(err);
			   }
			)

	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}
}
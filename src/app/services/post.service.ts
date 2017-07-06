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
			      
			      console.log(success)
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
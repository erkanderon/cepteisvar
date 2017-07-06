import { Injectable } from '@angular/core';
import {AppSettings} from '../config/app.settings';
import {Headers ,Http , RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Return} from '../models/return.model'
import {Comment} from '../models/comment'
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class Pub {


	constructor(private http: Http) { }
    
    //getting the languages
    getLanguages(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-languages';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}

	//getting the cities
	getCities(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-city-list';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getCompanyBusinessArea(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-company-business-area';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getJobTypeList(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-job-type-list';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getPaymentStatusTypes(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-payment-status-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getPaymentTypes(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-payment-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getGenderTypes(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-gender-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting company business area
	getEducationTypes(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-education-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting homepage profiles
	getHomepageMembers(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/acc/list-all-homepage-members';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	getCityFieldList(param): Promise<void> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-city-county-list', {"P_CITY_ID" : param}, options)
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
	getFieldList() {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-language-entries', {"P_LOCAL_STR" : "TR"}, options)
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
	    console.error('An error occurred', error);
	    return Promise.reject(error.message || error);
	}
}
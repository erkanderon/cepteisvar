import { ElementRef, Component, ViewChild } from '@angular/core';
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

	
	public sepetModel:any={};

	public searchParams:any=false;
	public searchModel:any=false;

	constructor(private http: Http) { 
		
	}
    
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
	getMilitaryChoices(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/list-military-status-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting driver licenses
	getDriverLicenseTypes(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/list-driver-licence-types';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting job categories
	getJobCategories(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/list-job-categories';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting military services profiles
	getHomepageMembers(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/acc/list-all-homepage-members';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting news for home
	getNews(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/list-all-news';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting news for home
	getJobStatistics(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/get-job-statistics';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//getting sms promotions
	getSMSPromotions(): Promise<Return> {
	    const url = AppSettings.API_ENDPOINT+'/app/list-all-sms-promotions';
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as Return)
	      .catch(this.handleError);
	}
	//GET PROFILE PICTURE
	getProfilePicture(uri): Promise<Return> {
		let token = localStorage.getItem('user_access_token');
	    const url = uri + '?access_token='+token;
	    
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response)
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
	getJobFieldList(param): Promise<void> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-job-type-list', {"P_JOB_CATEGORY_ID" : param}, options)
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
	// GET SPECIFIC NEW
	getNew(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/preview-news', {"p_haber_id": param}, options)
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
	// USER RESET USER PASSWORD
	resetPassword(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/reset-user-account', {"P_EMAIL": param}, options)
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

	getSepetModel() {
    	return this.sepetModel;
    }
    getSearchParams() {
    	return this.searchParams;
    }
    getSearchModel() {
    	return this.searchModel;
    }

	


	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error);
	    return Promise.reject(error.message || error);
	}
}
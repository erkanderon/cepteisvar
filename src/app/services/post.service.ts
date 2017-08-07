import { Injectable } from '@angular/core';
import {AppSettings} from '../config/app.settings';
import {Headers ,Http , RequestOptions} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Return} from '../models/return.model'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PostService {

	constructor(private http: Http, private router: Router) { }


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
			      this.router.navigate(['/home']);
			   }
			)

	}
	validateMemberAccount(param) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/validate-sms-code', param, options)
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
			      return err;
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
			   }
			)

	}

	// SHOW MEMBER PRIVATE ACCOUNT
	showMemberPrivateAccount(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/show-member-private-info?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// UPLOAD PHOTO SERVICE
	uploadPhoto(userid, groupid, file): Promise<any> {
		let headers = new Headers({});
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    const formData = new FormData();
    	formData.append('p_userid', userid);
    	formData.append('p_group_id', groupid);
    	formData.append('p_file', file);
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/upload-profile-photo?access_token='+token, formData, options)
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
			      //this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// GET USER COMMENTS OTHERS
	getMemberCommentsOthers(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-user-comments-other?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// GET COMPANY SMS
	getCompanySMS(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-company-sms-list?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// GET COMPANY BASKET
	getCompanyBasket(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-company-basket-list?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// CREATE BASKET LIST SMS
	createCompanyBasket(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/create-sms-basket?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// INSERT USER COMMENT
	createComment(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/insert-user-comment?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// LIST HABER COMMENT
	getListNewsComment(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/list-news-comments', param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// SET NO COMMENT FOR USERS
	setNoComment(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/set-no-comment-for-users?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// GET BASKET DETAIL
	getCompanyBasketDetail(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/get-basket-details?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// BUY SMS REQUEST
	buySmsRequest(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/buy-sms?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// HOMEPAGE SEARCH MEMBER
	searchWorker(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/app/search-members', param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// PREVIEW ACCOUNT BALANCE
	previewAccountBalance(param): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/preview-account-balance?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}
	// GET PROFILE PHOTO
	getProfilePhoto(param, groupid, userid): Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });
	    let token = localStorage.getItem('user_access_token');
	    
	    return this.http.post(AppSettings.API_ENDPOINT+'/acc/photo/'+ groupid +'/'+userid+'?access_token='+token, param, options)
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
			      this.router.navigate(['/home']);
			   }
			)

	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}
}
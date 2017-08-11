import { ElementRef, Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Pub } from '../../services/pub.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';
import { CreateBasketModel } from '../../models/createBasket.model';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'sms-gonder',
  templateUrl: './sms.gonder.html',
  styleUrls: ['./sms.gonder.css']
})
export class SMSGonderComponent {

	company = {};
	basket:any = {};
	sms:any={};
	userModel: any={};
	balance:any={};
	operation: any=false;
	operationfault: any=false;

	lengthChar: any=0;
	willPay: any=0;

	constructor(private elRef : ElementRef, private _post: PostService, private router: Router, private _pub: Pub) { 
		jQuery(document).ready(function () {
			jQuery('.myCheckbox').click(function() {
			      jQuery(this).siblings('input:checkbox').prop('checked', false);
			  });
  		});
	}

	ngOnInit() {

		this.company = new PreviewCompanyModel(localStorage.getItem('user'));
		this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.getop(res));

		this.basket = this.getBasketData();
	}

	getop(res){
	    if(res.data){
	      
	      this.sms = this._post.getCompanySMS({"p_company_id": res.data[0].COMPANY_ID}).then(sms => this.sms = sms);

	      this.userModel = res.data[0].COMPANY_ID;

	      this.balance = this._post.previewAccountBalance({ "p_email": res.data[0].EMAIL}).then(balance => this.balance = balance);
	      
	    }
	    console.log(this.sms);
	}

	getBasketData(){
		let model = [];
		if(this._pub.getSepetModel()){
			let mod = this._pub.getSepetModel();

			for(let i of mod){
				model.push(i.USER_ID);
			}
		}
		return model;
		
	}
	responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}

	// CHANGE PASSWORD
	sendSMS(fav: NgForm) {

		let uri = '/is-veren-profil';
		let send = new CreateBasketModel(this.userModel, this.basket, fav.value.text);		

		this._post.createCompanyBasket(JSON.stringify(send)).then(
		  //used Arrow function here
		  (success)=> {
		    
		    if(this.responser(success)){

		    	this._pub.sepetModel ={};
		    	this.operation = true;

		    	setTimeout(()=>{ 
				   this.router.navigate([uri, {foo: "profil"}]);
				  }, 3000);
			      
			    
		     	

		    }else{
		      //give a message
		      this.operationfault = true;
		      setTimeout(()=>{ 
				   this.router.navigate([uri, {foo: "profil"}]);
				  }, 3000);
		    }
		    
		  }
		).catch(
		 //used Arrow function here
		 (err)=> {
		    this.router.navigate(['/home']);
		 }
		)
		

	}
	showPayment(e){
		
    	let newValue = e.target.value;

    	if(newValue.length !==0 ){

	    	this._post.smsEstimator({"p_receiver_count": this.basket.length, "p_sms_text": newValue }).then(
			  //used Arrow function here
			  (success)=> {
			    
			    if(this.responser(success)){

			    	this.lengthChar = success.data.SMS_PAGE_SIZE;
			    	this.willPay = success.data.AMOUNT;

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
			this.lengthChar = 0;
			this.willPay = 0;
		}


	}
  
  	
}
import { ElementRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import {NgForm} from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'payment-result-comp',
  templateUrl: './payment.result.html',
  styleUrls: ['./payment.result.css']
})
export class PaymentResult {
  
    statusObject:any={};

    status:any;
    messages:any={};
    



  constructor(private _authService: AuthService, private route: ActivatedRoute, private router: Router, private _pub: Pub, private _post: PostService){ 

  }

  ngOnInit() {


    
    this.statusObject.p_bank_token = localStorage.getItem('bankQueryResultToken');
    this.statusObject.p_company_id = localStorage.getItem('bankQueryResultCid');

		this.checkInstance(this.statusObject);
   
	    
  }

  checkInstance(obj){
  		if(!obj.p_bank_token || !obj.p_company_id){
        //console.log(obj.p_bank_token, obj.p_company_id)
        this.router.navigate(['/home']);
      }else{

        obj.p_company_id = parseInt(obj.p_company_id);
        this._post.getBankResult(obj).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){

              this.status = true;
              this.messages = success;
              localStorage.removeItem('bankQueryResultToken');
              localStorage.removeItem('bankQueryResultCid');


            }else{
              //give a message
              this.status = false;
              localStorage.removeItem('bankQueryResultToken');
              localStorage.removeItem('bankQueryResultCid');
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            
            localStorage.removeItem('bankQueryResultToken');
            localStorage.removeItem('bankQueryResultCid');
            this.router.navigate(['/home']);
         }
      )
    }
  }
  responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}

  
  

  
}
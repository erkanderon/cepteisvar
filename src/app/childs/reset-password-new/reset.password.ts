import { ElementRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import {NgForm} from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'calisan-reset-comp',
  templateUrl: './reset.password.html',
  styleUrls: ['./reset.password.css']
})
export class ResetPasswordNew {
  
    sub:any={};
    p_userid:any="";
    p_group_id:any="";
    p_reset_code:any="";


  constructor(private _authService: AuthService, private route: ActivatedRoute, private router: Router, private _pub: Pub, private _post: PostService){ 

  }

  ngOnInit() {


    this.route.queryParams.subscribe((params: Params) => {
        this.p_userid = params['p_userid']; 
		this.p_group_id = params['p_group_id'];
		this.p_reset_code = params['p_reset_code'];

		this.checkInstance(this.p_userid, this.p_group_id, this.p_reset_code);
    });
	    
  }

  checkInstance(userid, groupid, resetcode){
  		if(!this.p_userid || !this.p_group_id || !this.p_reset_code){
  			this.router.navigate(['/home']);
  		}
  }
  responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}

  // RESET PASSWORD
  reset(fav: NgForm) {
    

    if(fav.value.pass){

    	if(!(fav.value.pass.length<5)){
    		console.log("service calling")
    		this._post.validateResetAccount({ "P_USERID": parseInt(this.p_userid), "P_GROUP_ID": parseInt(this.p_group_id), "P_RESET_CODE": this.p_reset_code, "P_NEW_PASSWD": fav.value.pass }).then(
		        //used Arrow function here
		        (success)=> {
		          
		          if(this.responser(success)){
		          	if(this.p_group_id===4000){
		            	this.router.navigate(['/calisan-giris']);
		            }else{
		            	this.router.navigate(['/isveren-giris']);
		            }
		          }else{
		            //give a message
		          }
		          
		        }
		    ).catch(
		       //used Arrow function here
		       (err)=> {
		       	  console.log(err);
		          this.router.navigate(['/home']);
		       }
		    )



    	}else{
    		// at least 6 char olmali
    	}

    }
    
    
  }
  

  
}
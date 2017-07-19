import { ElementRef, Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Pub } from '../../services/pub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';
import { EditCompanyAccountModel } from '../../models/editCompanyAccount.model';
import { ChangeAccountPasswordModel } from '../../models/changeAccountPassword.model';
import {NgForm} from '@angular/forms';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'isverenprofil-comp',
  templateUrl: './is.veren.profil.component.html',
  styleUrls: ['./is.veren.profil.component.css'],
  providers: [PostService]
})
export class IsVerenProfilComponent {

	public state = 0;
	company = {};
	profile : any ={};
	cities : any ={};
	ct : any ={};
	selectedDevice : any ={};
	comments: any = {};

	constructor(private elRef : ElementRef, private _post: PostService, private router: Router, private _pub: Pub) { 
		jQuery(document).ready(function () {
			jQuery('.myCheckbox').click(function() {
			      jQuery(this).siblings('input:checkbox').prop('checked', false);
			  });
  		});
	}

	ngOnInit() {

		this.company = new PreviewCompanyModel(localStorage.getItem('user'));
		this.profile = this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.profile = res);
		this.cities = this._pub.getCities().then(cities => this.cities = cities);

		this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.getop(res));

	}

	getop(res){
	    if(res.data){
	      this.comments = this._post.getCompanyComments({"P_COMPANY_ID": res.data[0].COMPANY_ID}).then(comments => this.comments = comments);
	      //this.sms = this._post.getMemberSMS({"p_userid": res.data[0].USER_ID}).then(sms => this.sms = sms);
	      
	    }
	    console.log(this.comments);
	}



	public setNumber = (number) => {  
	  	this.state = number;
	  	window.scrollTo(0, 0);
	}
	responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}
	onChange(newValue) {
      
      this.ct = this._pub.getCityFieldList(newValue).then(ct => this.ct = ct);
      this.selectedDevice = newValue;
  	}

	editCompanyForm(f: NgForm) {
      let companyid = this.profile.data[0].COMPANY_ID;
      //let dt = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy');
      let company = new EditCompanyAccountModel(companyid, f.value.cn, f.value.taxn, f.value.ta, f.value.address , f.value.rpn , parseInt(f.value.sd), f.value.rp, f.value.tel, parseInt(f.value.ilce) , 21 );

      console.log(company);
      if(f.valid && !!company){
        this._post.editCompanyAccount(JSON.stringify(company)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              //refresh page
            }else{
              //give error
            }
            console.log(success);
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
    }
      
  }
  // CHANGE PASSWORD
  changePassword(fav: NgForm) {
    
    let companyid = this.profile.data[0].COMPANY_ID;
    let groupid = this.profile.data[0].GROUP_ID;
    let uri = '/isveren-giris';
    let pwd = new ChangeAccountPasswordModel(companyid, groupid.toString(), fav.value.oldpass, fav.value.newpass);

    console.log(pwd);

    if(fav.valid && fav.value.newpass===fav.value.newpass2){

      this._post.changePassword(JSON.stringify(pwd)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.router.navigate([uri]);
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
    }
    
  }
  
  	
}
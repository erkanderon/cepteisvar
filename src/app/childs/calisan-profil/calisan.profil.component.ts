import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { PreviewMemberModel } from '../../models/previewMemberAccount.model';
import { PostService } from '../../services/post.service';

import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';



@Component({
  moduleId: module.id,
  selector: 'calisanprofil-comp',
  templateUrl: './calisan.profil.component.html',
  styleUrls: ['./calisan.profil.component.css']
})


export class CalisanProfilComponent {
	

	sub: any;
	id: any ="";
	profile: any ={};
	comments: any={};
	model: any=[];
	islogged: any=false;

	company: any; companyId: any; sepetExistMessage: any = false; sepetMemberIds: any = [];

	constructor( private route: ActivatedRoute, private _pub: Pub, private router: Router, private _post: PostService, private _authService: AuthService) { 



		this.sub = this.route.params.subscribe(params => {
	       this.id = +params['id']; // (+) converts string 'id' to a number
	       //this.member = new PreviewMemberModel();
	       this.getProfile(this.id);
	       console.log(this.profile);
	       // In a real app: dispatch action to load the details here.
	    });

		
		
	}

	ngOnInit() {

	    //this.news = this._pub.getNews().then(res => this.news = res);

	    //console.log(this.new);
	    this.islogged = this._authService.isLoggedIn()&&localStorage.getItem('userrole')==='business';
  	}

  	getProfile(id){
  		this.profile = this._post.showMemberPrivateAccount({ "p_member_id": this.id}).then(res => this.getop(res));
  	}
  	getop(res){
  		console.log(res);
  		if(res){
	    	if(res.data){
	    		this.profile = res;
	    		this.comments = this._post.getMemberCommentsOthers({ "p_userid": this.id}).then(res => this.comments = res);
	    		this._post.getMemberCommentsOthers({ "p_userid": this.id}).then(res => console.log(res));

	    	}
	    }
  	}
  	responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}
	openModel(){
					jQuery("#mmodal").modal('show');
					
				}
  	checkCompanyForSMS(user){
		this.islogged = (this._authService.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
		console.log(this.islogged);
		if(this.islogged){
			this.model.push(user);
			this.createSepet();
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	createSepet(){
		
		let peopleId = [];
		this._pub.sepetModel = this.model;
		if(!this.model.length){
			//this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);
		}else{
			for(let j in this.model){
				peopleId.push(this.model[j].USER_ID);
				
			}
			this.company = new PreviewCompanyModel(localStorage.getItem('user'));
			this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.createSepetService(res, peopleId));
		}

	}
	createSepetService(comp, ids){
		this.sepetMemberIds = ids;
		this.companyId = comp.data[0].COMPANY_ID;

		this._post.createCompanyBasket({ "p_company_id": this.companyId, "p_member_id": ids }).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);
            }else if(success.code===920){
              //give error
              this.sepetExistMessage = success.userMessage;
              this.openModel();
              console.log(success);
            }else{
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
	addToExistingSepet(){
		this._post.getMyOpenBasket({"p_company_id": this.companyId}).then(res => this.addPersonToOpenBasket(res));

		
	}
	addPersonToOpenBasket(res){
		let id = res.data[0].BASKET_ID
		console.log(res);


		this._post.addToMyOpenBasket({ "p_company_id": this.companyId, "p_basket_id": id, "p_member_id": this.sepetMemberIds }).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);
            }else{
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
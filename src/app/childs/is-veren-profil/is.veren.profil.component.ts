import { ElementRef, Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';
import { PreviewMemberModel } from '../../models/previewMemberAccount.model';
import { EditCompanyAccountModel } from '../../models/editCompanyAccount.model';
import { ChangeAccountPasswordModel } from '../../models/changeAccountPassword.model';
import { BuySmsModel } from '../../models/buySmsModel';
import { InsertCommentModel } from '../../models/insertUserComment.model';
import { SetNoCommentModel } from '../../models/setNoCommentForUsers.model';
import { Location } from '@angular/common';

import {NgForm} from '@angular/forms';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'isverenprofil-comp',
  templateUrl: './is.veren.profil.component.html',
  styleUrls: ['./is.veren.profil.component.css']
})
export class IsVerenProfilComponent {

	public state = 0;
	company = {};
	profile : any ={};
	cities : any ={};
	ct : any ={};
	selectedDevice : any ={};
	comments: any = {};
	basket:any = {};
	sms:any={};
  cn: any=""; rp: any=""; mail: any=""; ta: any=""; sd: any=""; tel: any=""; rpn: any=""; taxn: any=""; address: any=""; ilce: any="";
  detail:any=0;
  cid: any=0;
  basketDetail:any={};
  balance:any={};
  promotions: any={};
  commentUser:any;
  sepetid: any;
  model: any = [];

  p: number = 1;
  c: number = 1;

  param: any;
  sub: any;
  foo: any;
  fileImage: any = false;
  bankSms: any = "f";
  bankSuccessModel: any={};
  smsfee: any =0;
  smsCount: any=0;
  smspackageid: any=0;
  smsNumber: any=0;
  pphoto: any;

  basketData: any = {};

  operation: any = {};
  operationfault: any = {};

	constructor(private elRef : ElementRef, private _post: PostService, private router: Router, private _pub: Pub, private route: ActivatedRoute, private location: Location) { 
		jQuery(document).ready(function () {
			jQuery('.myCheckbox').click(function() {
			      jQuery(this).siblings('input:checkbox').prop('checked', false);
			  });
  		});
	}

	ngOnInit() {
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
          this.sub = this.route.params.subscribe(params => {
           this.param = params['foo']; // (+) converts string 'id' to a number
           this.activaTab("#"+this.param);
           
        });
        
      });

		this.company = new PreviewCompanyModel(localStorage.getItem('user'));
		this.profile = this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.profile = res);
		this.cities = this._pub.getCities().then(cities => this.cities = cities);
    this.promotions = this._pub.getSMSPromotions().then(promotions => this.promotions = promotions);
    this.smsfee = this._pub.getSMSFee().then(smsfee => this.smsfee = smsfee);
		this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.getop(res));

	}

	getop(res){
    if(res){
	    if(res.data){
	      this.comments = this._post.getCompanyComments({"P_COMPANY_ID": res.data[0].COMPANY_ID}).then(comments => this.comments = comments);
        
	      this.sms = this._post.getCompanyBasket({"p_company_id": res.data[0].COMPANY_ID}).then(sms => this.sms = sms);
        this.basketData = this._post.getMyOpenBasket({"p_company_id": res.data[0].COMPANY_ID}).then(res => this.setBasketData(res));
        this.onChange(res.data[0].CITY_ID);

        

        this.cn = res.data[0].COMPANY_NAME;
        this.rp = res.data[0].CONTACT_PERSON;
        this.mail = res.data[0].EMAIL;
        this.ta = res.data[0].TAX_REGION;
        this.sd = res.data[0].CITY_ID;
        this.rpn = res.data[0].CONTACT_PERSON_NO;
        this.taxn = res.data[0].TAX_NUMBER;
        this.address = res.data[0].ADDRESS;
        this.ilce = res.data[0].COUNTY_ID;
        this.tel = res.data[0].CONTACT_NO;

        this.cid = res.data[0].COMPANY_ID;

        this.balance = this._post.previewAccountBalance({ "p_email": res.data[0].EMAIL}).then(balance => this.balance = balance);
        this.pphoto = this._post.getProfilePhoto(4200, res.data[0].COMPANY_ID);
        
	      
	    }
	  }
  }
  
  setBasketData(res){
  
    if(!res.data){
      this.basket = [];
    }else{
      this.basket = res.data;
      
    }
  }
	getBasketData(){
		let model = [];
		if(this._pub.getSepetModel()){
			model = this._pub.getSepetModel();
		}
		return model;
	}

  navigateParam(par){
    this.activaTab(par);
    this.router.navigate(['/is-veren-profil', { foo: par }]);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  imageUploaded(event){
    this.fileImage = event.file;
    
  }
  imageRemoved(event){
    this.fileImage = false;
  }
  activaTab(tab){
    jQuery(tab).tab('show');
  };

  addModel(val, id){

    if(val.target.checked){
      this.model.push(id);
    }else{
      let index = this.model.indexOf(id, 0);
      if (index > -1) {
         this.model.splice(index, 1);
      }
    }
  }


  
  public setDetail = (number, id) => {  
      this.detail = number;
      window.scrollTo(0, 0);
      if(id){
        this.getDetail(id);
      }
  }
  setWillCommentedUser(id){
    this.commentUser = id;
  }
  getWillCommentedUser(){
    return this.commentUser;
  }
  setSepetId(id){
    this.sepetid = id;
  }
  getSepetId(){
    return this.sepetid;
  }
  public getDetail = (did) => {  
      this.setSepetId(did);
      this.basketDetail = this._post.getCompanyBasketDetail({"p_company_id": this.cid, "p_basket_id": did}).then(res => this.basketDetail = res);
      window.scrollTo(0, 0);
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
  showPayment(event){

    this.smsCount = this.smsfee.data * event;
    this.smsNumber = event;
    
  }
  removeBank(){
    location.reload();
    
  }

  setPacketId(event, number){
    if(event){
      if(number===1){
        this.smspackageid = 1;
        jQuery('#myCheckbox'+2).prop('checked', false);
        jQuery('#myCheckbox'+3).prop('checked', false);
      }else if(number===2){
        this.smspackageid = 2;
        jQuery('#myCheckbox'+1).prop('checked', false);
        jQuery('#myCheckbox'+3).prop('checked', false);
      }else{
        this.smspackageid = 3;
        jQuery('#myCheckbox'+1).prop('checked', false);
        jQuery('#myCheckbox'+2).prop('checked', false);
      }
      
    }else{
      this.smspackageid = 0;
    }
  }

  // SET NO COMMENT
  setNoComment(reason){
    let mdl = this.model;
    let companyid = this.profile.data[0].COMPANY_ID;
    let sepet = this.getSepetId();
    let com = new SetNoCommentModel(companyid, mdl, sepet, reason);

    this._post.setNoComment(JSON.stringify(com)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.operation.status = success.status;
              this.operation.text = success.userMessage;

              setTimeout(()=>{ 
               location.reload();
              }, 5000);
            }else{
              //give error
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )

  }
  // EDIT COMPANY
	editCompanyForm(f: NgForm) {
      let companyid = this.profile.data[0].COMPANY_ID;
      //let dt = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy');
      let company = new EditCompanyAccountModel(companyid, f.value.cn, f.value.taxn, f.value.ta, f.value.address , f.value.rpn , parseInt(f.value.sd), f.value.rp, f.value.tel, parseInt(f.value.ilce) , 21 );

      
      

      if(f.valid && !!company){
        this._post.editCompanyAccount(JSON.stringify(company)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
            if(this.fileImage){
                this._post.uploadPhoto(companyid, 4200, this.fileImage).then(
                    //used Arrow function here
                    (success)=> {
                      
                      if(this.responser(success)){
                        this.operation.status = success.status;
                        this.operation.text = success.userMessage;
                        setTimeout(()=>{ 
                           location.reload();
                          }, 5000);
                      }else{
                        //give a message
                        
                        this.operationfault.status = success.status;
                        this.operationfault.text = success.userMessage;
                      }
                      
                    }
                ).catch(
                   //used Arrow function here
                   (err)=> {
                      //this.router.navigate(['/home']);
                   }
                )
              }else{
                this.operation.status = success.status;
                this.operation.text = success.userMessage;
                setTimeout(()=>{ 
                   location.reload();
                  }, 5000);
              }
             // location.reload();
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
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
  // MAKE COMMENT
  makeComment(fav: NgForm) {
    
    let companyid = this.profile.data[0].COMPANY_ID;
    let userid = this.getWillCommentedUser();
    let sepet = this.getSepetId();
    let uri = '/home';
    let model = new InsertCommentModel(companyid, fav.value.comment, 10, userid, sepet);

    this._post.createComment(JSON.stringify(model)).then(
        //used Arrow function here
        (success)=> {
          
          if(this.responser(success)){
            this.operation.status = success.status;
            this.operation.text = success.userMessage;
            setTimeout(()=>{ 
               location.reload();
              }, 5000);
          }else{
            this.operationfault.status = success.status;
            this.operationfault.text = success.userMessage;
          }
          
        }
    ).catch(
       //used Arrow function here
       (err)=> {
       
          this.router.navigate(['/home']);
       }
    )
    
    
  }

  // CHANGE PASSWORD
  changePassword(fav: NgForm) {
    
    let companyid = this.profile.data[0].COMPANY_ID;
    let groupid = this.profile.data[0].GROUP_ID;
    let uri = '/isveren-giris';
    let pwd = new ChangeAccountPasswordModel(companyid, groupid.toString(), fav.value.oldpass, fav.value.newpass);

    

    if(fav.valid && fav.value.newpass===fav.value.newpass2){

      this._post.changePassword(JSON.stringify(pwd)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              //this.router.navigate([uri]);
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
                 location.reload();
                }, 5000);
            }else{
              //give a message
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
    }else{
      this.operationfault.status = "Yeni Parola Hatası";
      this.operationfault.text = "Parolalar Eşleşmiyor.";
    }
    
  }
  // BUY SMS
  buySms(){
    let companyid = this.profile.data[0].COMPANY_ID;
    let packetid = this.smspackageid;
    let smscount= this.smsNumber;
    let bankmodel = new BuySmsModel(companyid, packetid, smscount);

    this._post.buySmsRequest(JSON.stringify(bankmodel)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              //this.router.navigate([uri]);



              
              //Collect Flow Needs
              this.bankSuccessModel.token = success.data[0].BANK_TOKEN;
              this.bankSuccessModel.compid = this.profile.data[0].COMPANY_ID;
              localStorage.setItem("bankQueryResultToken", this.bankSuccessModel.token);
              localStorage.setItem("bankQueryResultCid", this.bankSuccessModel.compid);
              
      

              this.bankSms = success.data[0].BANK_SCRIPT;
              this.bankSms = this.bankSms.replace(/(<([^>]+)>)/ig, "");
              

              var bankModel = document.createElement('script');
              bankModel.innerHTML = this.bankSms;
              document.getElementById("modelcontent").appendChild(bankModel);

            }else{
              //give a message
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
  }

  removeFromSepet(user){
    /*let index = this.basket.indexOf(user, 0);
    if (index > -1) {
       this.basket.splice(index, 1);
    }*/
    //this._pub.sepetModel = this.basket;

    this._post.deleteFromMyOpenBasket({ "p_company_id": this.cid, "p_basket_id": user.BASKET_ID, "p_member_id": [user.MEMBER_ID]}).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              //this.router.navigate([uri]);
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              this.basketData = this._post.getMyOpenBasket({"p_company_id": this.cid}).then(res => this.setBasketData(res));
              /*setTimeout(()=>{ 
                 location.reload();
                }, 3000);*/
            }else{
              //give a message
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
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
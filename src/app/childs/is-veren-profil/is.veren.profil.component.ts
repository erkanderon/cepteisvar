import { ElementRef, Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Pub } from '../../services/pub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';
import { PreviewMemberModel } from '../../models/previewMemberAccount.model';
import { EditCompanyAccountModel } from '../../models/editCompanyAccount.model';
import { ChangeAccountPasswordModel } from '../../models/changeAccountPassword.model';
import { InsertCommentModel } from '../../models/insertUserComment.model';
import { SetNoCommentModel } from '../../models/setNoCommentForUsers.model';
import { Location } from '@angular/common';

import {NgForm} from '@angular/forms';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'isverenprofil-comp',
  templateUrl: './is.veren.profil.component.html',
  styleUrls: ['./is.veren.profil.component.css'],
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
  promotions: any={};
  commentUser:any;
  sepetid: any;
  model: any = [];

  param: any;
  sub: any;
  foo: any;
  fileImage: any = false;

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
		this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.getop(res));
		this.basket = this.getBasketData();
	}

	getop(res){
    if(res){
	    if(res.data){
	      this.comments = this._post.getCompanyComments({"P_COMPANY_ID": res.data[0].COMPANY_ID}).then(comments => this.comments = comments);
        console.log(this.comments);
	      this.sms = this._post.getCompanyBasket({"p_company_id": res.data[0].COMPANY_ID}).then(sms => this.sms = sms);
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

	      
	    }
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
    console.log(this.fileImage);
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
              location.reload();
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
  // EDIT COMPANY
	editCompanyForm(f: NgForm) {
      let companyid = this.profile.data[0].COMPANY_ID;
      //let dt = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy');
      let company = new EditCompanyAccountModel(companyid, f.value.cn, f.value.taxn, f.value.ta, f.value.address , f.value.rpn , parseInt(f.value.sd), f.value.rp, f.value.tel, parseInt(f.value.ilce) , 21 );

      
      //console.log(this.firma.errors && (this.firma.dirty || firma.touched));

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
                        location.reload();
                      }else{
                        //give a message
                        console.log(success)
                      }
                      
                    }
                ).catch(
                   //used Arrow function here
                   (err)=> {
                      //this.router.navigate(['/home']);
                   }
                )
              }
             // location.reload();
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
  // MAKE COMMENT
  makeComment(fav: NgForm) {
    
    let companyid = this.profile.data[0].COMPANY_ID;
    let userid = this.getWillCommentedUser();
    let sepet = this.getSepetId();
    let uri = '/home';
    let model = new InsertCommentModel(companyid, fav.value.comment, parseInt(fav.value.performans), userid, sepet);

    this._post.createComment(JSON.stringify(model)).then(
        //used Arrow function here
        (success)=> {
          
          if(this.responser(success)){
            //this.router.navigate([uri]);
            location.reload();
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

  removeFromSepet(user){
    let index = this.basket.indexOf(user, 0);
    if (index > -1) {
       this.basket.splice(index, 1);
    }
    this._pub.sepetModel = this.basket;
    this.basket = this.getBasketData();
  }
  
  	
}
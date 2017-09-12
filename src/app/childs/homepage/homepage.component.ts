import { ElementRef, Component , ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Return} from '../../models/return.model';
import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';
import {NgForm} from '@angular/forms';
import { SearchModel } from '../../models/searchModel';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AfterViewInit } from '@angular/core';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'home-comp',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomeComponent{
	cities: any;
	education: any;
	jobs: any={};
	profiles: any;
	fields: any;
	obj: any;
	news: any;
	statistics: any;
	islogged: any=false;
	jobcategory: any={};
	model: any = [];

	company:any = {};
	sepetExistMessage: any = "OK"; sepetMemberIds: any=[]; companyId: any=0;

	il: any; jobcat: any;
	searchIsModel: any=[];

	ismember: any =false;
	mobileAdvertise: any;

	@ViewChild('myModal') myModal;


	 jobCategoryList: any = {}; selectedjobCategory: any = {}; jobCategorySettings: any = {};
	 jobList: any = {}; selectedJob: any = {}; jobSettings: any = {};
	 cityList: any = {}; selectedCity: any = {}; citySettings: any = {}; citySelect: any = {};

	

	constructor(private elRef : ElementRef, private _pub: Pub, private _auth: AuthService, private router: Router, private _flashMessagesService: FlashMessagesService, private _post: PostService) { 

		// JQuery Defines
		jQuery(document).ready(function () {

			var options = [];

			

			jQuery( '.dropdown-menu a' ).on( 'click', function( event ) {

			   var $target = jQuery( event.currentTarget ),
			       val = $target.attr( 'data-value' ),
			       $inp = $target.find( 'input' ),
			       idx;

			   if ( ( idx = options.indexOf( val ) ) > -1 ) {
			      options.splice( idx, 1 );
			      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
			   } else {
			      options.push( val );
			      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
			   }

			   jQuery( event.target ).blur();

			      
			   console.log( options );
			   return false;
			});

			
	  		
			jQuery("#firms").slick({"slidesToShow": 8, "slidesToScroll": 1, "speed": 300, "infinite": true, "lazyLoad": 'ondemand'});
  		});
  		// JQuery finished

  		if(!!localStorage.getItem('userrole')){
  			this.islogged = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='member');
  		}

	}
	ngOnInit() {

		this.mobileAdvertise = this._pub.getAdvertise();

// JOB CATEGORY SELECTION SETTINGS START

			this.jobCategoryList = [];
	        this.selectedjobCategory = [];
	        this.jobCategorySettings = {
	                              singleSelection: true, 
	                              text:"İş Kategorisi Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class"
	        };

// JOB CATEGORY SELECTION END

// JOB SELECTION SETTINGS START
			this.jobList = [];
	        this.selectedJob = [];
	        this.jobSettings = {
	                              singleSelection: false, 
	                              text:"İş Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class",
	                              badgeShowLimit: 1
	        };

// JOB SELECTION END

// CITY SELECTION SETTINGS START

			this.cityList = [];
	        this.selectedCity = [];
	        this.citySettings = {
	                              singleSelection: true, 
	                              text:"İl Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: false,
	                              classes:"myclass custom-class"
	        };

// JOB CATEGORY SELECTION END

		this.ismember = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='member');

		//this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000000 });

		this.il = -10;
		this.jobcat = -10;

	    this._pub.getCities().then(cities => this.setCity(cities));
	    this.education = this._pub.getEducationTypes().then(education => this.education = education);
	    this._pub.getJobCategories().then(jobcategory => this.setJobCategory(jobcategory));
	    this.profiles = this._pub.getHomepageMembers().then(profiles => this.profiles = profiles);
	    this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));
	    this.news = this._pub.getNews().then(res => this.news = res);
	    this.statistics = this._pub.getJobStatistics().then(res => this.statistics = res);

	    console.log(this.profiles)
	}
	ngAfterViewChecked() {

	jQuery(".owl-prev" ).has("i").addClass("fa");
		

	}
	openModel(){
		jQuery("#mmodal").modal('show');
		//this.fileInput.nativeElement.click()
	}
	closeMobile(){
		this.mobileAdvertise = 0;
		this._pub.mobileAdvertise = 0;
		console.log(this.mobileAdvertise);
	}
	responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
	    }
	}


	formatFields(f) {
	  	this.obj = {};
	  	if(f.data){
		  	for (let items of f.data) {
		  		this.obj[items.ITEM] = items.TEXT
			}
		}
		return this.obj;
	}

// JOB CATEGORY SELECTION START
	onJobCategorySelect(item:any){
       this._pub.getJobFieldList(item.id).then(jobs => this.setJob(jobs));
    }
// JOB SELECTION START
	onJobSelect(item:any){
		console.log(item);
        this.searchIsModel.push(item.id);
        console.log(this.searchIsModel);
    }
    OnJobDeSelect(item:any){
    	console.log(item);
        let index = this.searchIsModel.indexOf(item.id, 0);
		if (index > -1) {
		   this.searchIsModel.splice(index, 1);
		}
    }
    onJobSelectAll(items: any){
        for(let k of items){
        	this.searchIsModel.push(k.id);
        }
    }
    onJobDeSelectAll(items: any){
        this.searchIsModel = [];
    }
// JOB SELECTION END

// CITY SELECTION START
	onCitySelect(item:any){
        //this.filterGender = item.id;

        this.citySelect = this.selectedCity[0];
    }
    
// CITY SELECTION END

	setJobCategory(param){
    	this.jobcategory = param;
    	
    	for(let i of param.data){
    		this.jobCategoryList.push({"id":i.CATEGORY_ID,"itemName":i.CATEGORY_NAME})

    	}
    }
    setJob(param){
    	this.jobs = param;

    	this.jobList = [];
    	for(let i of param.data){
    		this.jobList.push({"id":i.ID,"itemName":i.JOB_NAME});

    	}
    }
    setCity(param){
    	this.cities = param;
    	if(this.mobileAdvertise===1){
    		setTimeout(()=>{ 
               this.openModel();
            }, 500);

            
    		
    	}

    	for(let i of param.data){
    		this.cityList.push({"id":i.CITY_ID,"itemName":i.CITY_NAME})

    	}
    }

	
	checkUser(){
		/*this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		console.log(this.islogged);
		if(!this.islogged){*/
			this.router.navigate(['/calisan-arama']);
		/*}else{
			this.router.navigate(['/isveren-giris']);
		}*/
	}
	checkCompany(param){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
		console.log(this.islogged);
		if(this.islogged){
			this.router.navigate(['/calisan-profil', param]);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	checkCompanyForSMS(user){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
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
		//this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);

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
              this.openSepetModel();
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

	openSepetModel(){
		jQuery("#sepetmodal").modal('show');
		
	}
	
	checkMember(){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member');
		
		console.log(this.islogged);
		if(this.islogged){
			this.router.navigate(['/is-arayan-profil']);
		}else{
			this.router.navigate(['/calisan-giris']);
		}
	}
	
	search(fav: NgForm) {

		//console.log(this.cities);
		console.log(fav.value.selectedjobCategory);
	
	    if(fav.value.selectedjobCategory.length!==0 && fav.value.selectedCity.length!==0 && this.searchIsModel.length != 0){ 

	    	this._pub.searchParams = new SearchModel(parseInt(this.citySelect.id), this.searchIsModel, null);
	    	this._pub.searchModel = {};
	    	this._pub.searchModel.city = this.citySelect;
	    	this._pub.searchModel.category = this.selectedjobCategory[0];
	    	this._pub.searchModel.joblist = this.selectedJob;
	    	this.router.navigate( ['/calisan-arama']);
	    }else{
	    	//Give Message Not Valid Form
	    }
	 
	      
	    
	}
}
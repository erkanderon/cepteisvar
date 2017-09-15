import { ElementRef, Component, ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

import { SearchModel } from '../../models/searchModel';
declare var jQuery : any;
declare var List : any;
import { PreviewCompanyModel } from '../../models/previewCompanyAccount.model';

@Component({
  moduleId: module.id,
  selector: 'src-comp',
  templateUrl: './arama.component.html',
  styleUrls: ['./arama.component.css']
  
})
export class AramaComponent {

	profiles: any = {};
	company = {};
	companyIdSearch: any = null;
	model: any = [];
	saveUsername: any = false;
	islogged:any = false;
	jobcategory: any={};
	jobs: any={};
	cities: any;
	searchIsModel: any=[];
	restricted: any = false;

	genders: any; education:any; military: any; driver:any;
	p: number = 1;

	driverList: any = {}; selectedDrivers: any = {}; driverSettings: any = {};
	militaryList: any = {}; selectedMilitary: any = {}; militarySettings: any = {};
	educationList: any = {}; selectedEducation: any = {}; educationSettings: any = {};
	genderList: any = {}; selectedGender: any = {}; genderSettings: any = {};
	jobList: any = {}; selectedJob: any = {}; jobSettings: any = {};
	cityList: any = {}; selectedCity: any = {}; citySettings: any = {};

	jobCategoryList: any = {}; selectedjobCategory: any = {}; jobCategorySettings: any = {};


	filterClear: any = {}; kucuk:any; buyuk:any;
	filterParams: any = {}; homePageMembers:any = [];
	filterEducation: any=[]; filterMilitary: any=[]; filterDriver:any =[]; filterGender: any; highAge: any; lowAge: any;

	sepetExistMessage: any = "OK"; sepetMemberIds: any=[]; companyId: any=0;

	constructor(private elRef : ElementRef, private _pub: Pub, private _auth: AuthService, private router: Router, private _post: PostService) {

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


		    jQuery('#list').click(function(event){event.preventDefault();jQuery('#products .item').addClass('list-group-item');});
		    jQuery('#grid').click(function(event){event.preventDefault();jQuery('#products .item').removeClass('list-group-item');jQuery('#products .item').addClass('grid-group-item');});

		    
	  	});
	}

	ngOnInit() {

// GENDER SELECTION SETTINGS START
			this.genderList = [];
	        this.selectedGender = [];
	        this.genderSettings = {
	                              singleSelection: true, 
	                              text:"Cinsiyet Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: false,
	                              classes:"myclass custom-class"
	        };

// GENDER SELECTION END

// JOB CATEGORY SELECTION SETTINGS START

			this.jobCategoryList = [];
	        this.selectedjobCategory = [];
	        this.jobCategorySettings = {
	                              singleSelection: true, 
	                              text:"İş Kategorisi Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: false,
	                              classes:"myclass custom-class"
	        };

// JOB CATEGORY SELECTION END

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

// DRIVER SELECTION SETTINGS START
			this.driverList = [];
	        this.selectedDrivers = [];
	        this.driverSettings = {
	                              singleSelection: false, 
	                              text:"Ehliyet Sınıfı Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class",
	                              badgeShowLimit: 1
	        };

// DRIVER SELECTION END

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

// MILITARY SELECTION SETTINGS START
			this.militaryList = [];
	        this.selectedMilitary = [];
	        this.militarySettings = {
	                              singleSelection: false, 
	                              text:"Askerlik Durumu Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class",
	                              badgeShowLimit: 1
	        };

// MILITARY SELECTION END

// EDUCATION SELECTION SETTINGS START
			this.educationList = [];
	        this.selectedEducation = [];
	        this.educationSettings = {
	                              singleSelection: false, 
	                              text:"Eğitim Durumu Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class",
	                              badgeShowLimit: 1
	        };

// EDUCATION SELECTION END


		this._pub.getGenderTypes().then(genders => this.setGender(genders));
		this._pub.getEducationTypes().then(education => this.setEducation(education));

	  	if(!this._pub.getSearchModel() && !this._pub.getSearchParams()){
	  		console.log("burdayim");
	    	this._pub.getHomepageMembers().then(profiles => this.setProfiles(profiles));
	    }else{
	    	console.log("degilim");
	    	console.log(this._pub.getSearchParams());
	    	console.log(this._pub.getSearchModel());
	    	
	    	if(Object.keys(this._pub.getSearchModel().city).length!==0){
	    		this.selectedCity.push(this._pub.getSearchModel().city);
	    	}else{
	    		this.selectedCity = [];
	    	}

	    	if(this._pub.getSearchModel().category.length!==0){
	    		this.onJobCategorySelect(this._pub.getSearchModel().category[0]);
	    	}else{
	    		this.selectedjobCategory = [];
	    	}
	    	this.selectedjobCategory = this._pub.getSearchModel().category;
	    	this.selectedJob = this._pub.getSearchModel().joblist;
	    	console.log(this._pub.getSearchModel().category);
	    	this._post.searchWorker(this._pub.getSearchParams()).then(profiles => this.setProfiles(profiles));

	    }
	    if(!!localStorage.getItem('userrole')){
  			this.islogged = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='business');

  			if(this.islogged){
  				this.company = new PreviewCompanyModel(localStorage.getItem('user'));
				this._post.previewCompanyAccount(JSON.stringify(this.company)).then(res => this.setCompanyId(res));
  			}
  		}

  		this._pub.getMilitaryChoices().then(military => this.setMilitary(military));
  		this._pub.getJobCategories().then(jobcategory => this.setJobCategory(jobcategory));
  		this._pub.getCities().then(cities => this.setCity(cities));
  		this._pub.getDriverLicenseTypes().then(driver => this.setDriver(driver));
  		this._pub.getHomepageMembers().then(profiles => this.setHomePageProfiles(profiles));
	    
	}

	setCompanyId(res){
		this.companyIdSearch = res.data[0].COMPANY_ID;
	}
// DRIVER SELECTION START
	onDriverSelect(item:any){
        this.filterDriver.push(item.id);
    }
    OnDriverDeSelect(item:any){
        let index = this.filterDriver.indexOf(item.id, 0);
		if (index > -1) {
		   this.filterDriver.splice(index, 1);
		}
    }
    onDriverSelectAll(items: any){
        for(let k of items){
        	this.filterDriver.push(k.id);
        }
    }
    onDriverDeSelectAll(items: any){
        this.filterDriver = [];
    }
// DRIVER SELECTION END

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

// MILITARY SELECTION START
	onMilitarySelect(item:any){

        this.filterMilitary.push(item.id);

    }
    onMilitaryDeSelect(item:any){
        let index = this.filterMilitary.indexOf(item.id, 0);
		if (index > -1) {
		   this.filterMilitary.splice(index, 1);
		}
    }
    onMilitarySelectAll(items: any){
        for(let k of items){
        	this.filterMilitary.push(k.id);
        }
    }
    onMilitaryDeSelectAll(items: any){
        this.filterMilitary = [];
    }
// MILITARY SELECTION END

// EDUCATION SELECTION START
	onEduSelect(item:any){
        this.filterEducation.push(item.id);
    }
    onEduDeSelect(item:any){
        let index = this.filterEducation.indexOf(item.id, 0);
		if (index > -1) {
		   this.filterEducation.splice(index, 1);
		}
    }
    onEduSelectAll(items: any){
        for(let k of items){
        	this.filterEducation.push(k.id);
        }
    }
    onEduDeSelectAll(items: any){
        this.filterEducation = [];
    }
// EDUCATION SELECTION END

// GENDER SELECTION START
	onGenSelect(item:any){
        this.filterGender = item.id;
    }
    
// GENDER SELECTION END

// CITY SELECTION START
	onCitySelect(item:any){
        //this.filterGender = item.id;

        console.log(this.selectedCity[0]);
    }
    
// CITY SELECTION END

// JOB CATEGORY SELECTION START
	onJobCategorySelect(item:any){
		if(item.id){
			this._pub.getJobFieldList(item.id).then(jobs => this.setJob(jobs));
		}
        
    }
    
// GENDER SELECTION END

    setDriver(param){
    	this.driver = param;

    	for(let i of param.data){
    		this.driverList.push({"id":i.ID,"itemName":i.LICENSE_TYPE})

    	}
    }

    setCity(param){
    	this.cities = param;

    	for(let i of param.data){
    		this.cityList.push({"id":i.CITY_ID,"itemName":i.CITY_NAME})

    	}
    }

    setJob(param){
    	this.jobs = param;

    	for(let i of param.data){
    		this.jobList.push({"id":i.ID,"itemName":i.JOB_NAME});

    	}
    }

    setGender(param){
    	this.genders = param;

    	for(let i of param.data){
    		this.genderList.push({"id":i.TYPE_ID,"itemName":i.GENDER})

    	}
    }

    setEducation(param){
    	this.education = param;

    	for(let i of param.data){
    		this.educationList.push({"id":i.TYPE_ID,"itemName":i.EDUCATION_LEVEL})

    	}
    }

    setMilitary(param){
    	this.military = param;

    	for(let i of param.data){
    		this.militaryList.push({"id":i.TYPE,"itemName":i.STATUS})

    	}
    }
    setJobCategory(param){
    	this.jobcategory = param;

    	for(let i of param.data){
    		this.jobCategoryList.push({"id":i.CATEGORY_ID,"itemName":i.CATEGORY_NAME})

    	}
    }

	addToModel(val, user){

		if(val.target.checked){
			this.model.push(user);
		}else{
			let index = this.model.indexOf(user, 0);
			if (index > -1) {
			   this.model.splice(index, 1);
			}
		}
	}

  	setProfiles(param){
  		this.profiles = param;
  		this.filterClear = param.data;
  		console.log(this.profiles);
  	}
  	setHomePageProfiles(param){

  		this.homePageMembers = param.data;
  		console.log(this.homePageMembers);
  	}
  	clearSearch(){
  		this.selectedJob = [];
  		this.selectedCity = [];
  		this.selectedjobCategory = [];
  		this.profiles.data = this.homePageMembers;
  	}
  	responser(obj) {
	    if(obj.code === 200){
	      return true;
	    }else{
	      return false;
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
	openModel(){
					jQuery("#mmodal").modal('show');
					
				}
	directSms(user){
		if(this.islogged){
			this.model.push(user);
			this.createSepet();
		}else{
			this.router.navigate(['/isveren-giris']);
		}
		
	}
	canSeeProfile(id){
		/*if(this.islogged){*/
			this.router.navigate(['/calisan-profil', id]);
		/*}else{
			this.router.navigate(['/isveren-giris']);
		}*/
		
	}
	addToSearchModel(val, jid){

		if(val.target.checked){
			this.searchIsModel.push(jid);
		}else{
			let index = this.searchIsModel.indexOf(jid, 0);
			if (index > -1) {
			   this.searchIsModel.splice(index, 1);
			}
		}
	}

	getArrayModelLength(param) {
	    try {
	    	
	        	return [param.id];
	        
	    }
	    catch (e) {
	        return [0];
	    }
	}
	checker(value) {
		if(value){
			return 0;
		}else{
			return 1;
		}
	}

	// SEARCH PERSON
  searchPerson(fav: NgForm) {
    let srchmdl = [0];

    if(this.searchIsModel.length===0){
    	srchmdl = [0]
    }else{
    	srchmdl = this.searchIsModel;
    }

    if(!this.companyIdSearch){ this.companyIdSearch = 0;}
    //let model = new SearchModel(parseInt(this.selectedCity[0].id), srchmdl, null );
    let model = new SearchModel(this.getArrayModelLength(this.selectedCity[0]), srchmdl, this.getArrayModelLength(this.selectedjobCategory[0]), this.companyIdSearch, this.checker(fav.value.restricted));
    

    console.log(model);
    this._post.searchWorker(JSON.stringify(model)).then(profiles => this.setProfiles(profiles));
    //this._post.searchWorker(JSON.stringify(model)).then(profiles => console.log(profiles));
  }




  /* FILTER OPERATIONS */

  clearFilter(){
  	
  	
  	this.kucuk = null;
  	this.buyuk = null;
  	this.selectedDrivers = [];
  	this.selectedGender = [];
  	this.selectedMilitary = [];
  	this.selectedEducation = [];
  	this.profiles.data = this.filterClear;
  }
  clearGender(){
  	
  }

  setAgeLow(event){
  	
  	if(event !== null){
  		
  		this.lowAge = parseInt(event);

  	}else{
  		
  		this.lowAge = undefined;
  	}
  }
  setAgeHigh(event){
  	if(event !== null){
  		
  		this.highAge = parseInt(event);
  	}else{
  		
  		this.highAge = undefined;
  	}
  }

  onChangeGender(e){
  	let temp = [];
  	if(e==='1' || e==='2'){

  		this.filterGender = parseInt(e);
  		
  	}else{
  		this.filterGender = undefined;
  	}
  	
  }

  

  makeFilter(){

  	
  	
  	console.log(this.filterGender + " "+ this.highAge + " "+ this.lowAge + " "+ this.filterDriver.length + " "+ this.filterMilitary.length + " "+ this.filterEducation.length);

  	let result = [];
  	//let temp = this.profiles.data;
  	let temp = this.filterClear;
  	

  	


	// Eger Her get fonksiyonu field kontrol edip aldigi arrayi filter edip yada direk geri donerse bu is cozulur.

	this.profiles.data = this.getEducation(this.getAgePeople(this.getDriver(this.getMilitary(this.getGender(temp)))));

  	
  	console.log(result);
  }

  getEducation(array){
  	var result = [];
  	if(this.filterEducation.length !== 0){
	  	for(let v of array){
	  		for(let k of this.filterEducation)
	  			if(v.EDUCATION_ID === k){
	  				result.push(v);
	  			}
	  	}
	}else{
		return array;
	}
  	return result;
  }
  getMilitary(array){
  	var result = [];
  	if(this.filterMilitary.length !== 0){
	  	for(let v of array){
	  		for(let k of this.filterMilitary)
	  			if(v.MILITARY_ID === k){
	  				result.push(v);
	  			}
	  	}
	}else{
		return array;
	}
  	return result;
  }
  getDriver(array){
  	var result = [];
  	if(this.filterDriver.length !== 0){
	  	for(let v of array){
	  		for(let k of this.filterDriver)
	  			if(v.LICENSE_ID === k){
	  				result.push(v);
	  			}
	  	}
	}else{
		return array;
	}
  	return result;
  }
  getGender(array){
  	var result = [];
  	if(this.filterGender){
	  	for(let v of array){
	  		if(v.GENDER_ID === this.filterGender){
	  		    result.push(v);
	  		}
	  	}
	}else{
		return array;
	}
  	return result;
  }
  getAgePeople(array){
  	var result = [];
  	if(this.lowAge && this.highAge){
	  	for(let v of array){
	  		if(v.AGE >= this.lowAge && v.AGE <=this.highAge){
	  		    result.push(v);
	  		}
	  	}
	}else{
		return array;
	}
  	return result;
  }


  
  	
}
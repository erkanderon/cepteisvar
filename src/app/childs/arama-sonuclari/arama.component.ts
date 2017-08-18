import { ElementRef, Component, ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';

import { SearchModel } from '../../models/searchModel';
declare var jQuery : any;
declare var List : any;

@Component({
  moduleId: module.id,
  selector: 'src-comp',
  templateUrl: './arama.component.html',
  styleUrls: ['./arama.component.css']
  
})
export class AramaComponent {

	profiles: any = {};
	model: any = [];
	saveUsername: any = false;
	islogged:any = false;
	jobcategory: any={};
	jobs: any={};
	cities: any;
	searchIsModel: any=[];
	il: any; jobcat: any; cinsiyet: any;

	genders: any; education:any; military: any; driver:any;
	p: number = 1;

	driverList: any = {}; selectedDrivers: any = {}; driverSettings: any = {};
	militaryList: any = {}; selectedMilitary: any = {}; militarySettings: any = {};
	educationList: any = {}; selectedEducation: any = {}; educationSettings: any = {};


	filterClear: any = {}; kucuk:any; buyuk:any;
	filterParams: any = {}; homePageMembers:any = [];
	filterEducation: any=[]; filterMilitary: any=[]; filterDriver:any =[]; filterGender: any; highAge: any; lowAge: any;

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

// DRIVER SELECTION SETTINGS START
			this.driverList = [];
	        this.selectedDrivers = [];
	        this.driverSettings = {
	                              singleSelection: false, 
	                              text:"Ehliyet Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class"
	        };

// DRIVER SELECTION END

// MILITARY SELECTION SETTINGS START
			this.militaryList = [];
	        this.selectedMilitary = [];
	        this.militarySettings = {
	                              singleSelection: false, 
	                              text:"Askerlik Durumu Seçiniz",
	                              selectAllText:'Hepsini Seç',
	                              unSelectAllText:'Hepsini Sil',
	                              enableSearchFilter: true,
	                              classes:"myclass custom-class"
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
	                              classes:"myclass custom-class"
	        };

// EDUCATION SELECTION END

		this.il = -10;
		this.jobcat = -10;
		this.cinsiyet = 4;

		this.genders = this._pub.getGenderTypes().then(genders => this.genders = genders);
		this._pub.getEducationTypes().then(education => this.setEducation(education));

	  	if(!this._pub.getSearchModel() && !this._pub.getSearchParams()){
	  		console.log("burdayim");
	    	this._pub.getHomepageMembers().then(profiles => this.setProfiles(profiles));
	    }else{
	    	console.log("degilim");
	    	console.log(this._pub.getSearchParams());
	    	this._post.searchWorker(this._pub.getSearchParams()).then(profiles => this.setProfiles(profiles));

	    }
	    if(!!localStorage.getItem('userrole')){
  			this.islogged = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='business');
  		}

  		this._pub.getMilitaryChoices().then(military => this.setMilitary(military));
  		this.jobcategory = this._pub.getJobCategories().then(jobcategory => this.jobcategory = jobcategory);
  		this.cities = this._pub.getCities().then(cities => this.cities = cities);
  		this._pub.getDriverLicenseTypes().then(driver => this.setDriver(driver));
  		this._pub.getHomepageMembers().then(profiles => this.setHomePageProfiles(profiles));
	    
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

    setDriver(param){
    	this.driver = param;

    	for(let i of param.data){
    		this.driverList.push({"id":i.ID,"itemName":i.LICENSE_TYPE})

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

	onJobChange(newValue) {
    
    	this.jobs = this._pub.getJobFieldList(newValue).then(jobs => this.jobs = jobs);

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
  		this.profiles.data = this.homePageMembers;
  	}

	createSepet(){
		
		this._pub.sepetModel = this.model;
		this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);

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
		if(this.islogged){
			this.router.navigate(['/calisan-profil', id]);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
		
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

	// SEARCH PERSON
  searchPerson(fav: NgForm) {
    
    let model = new SearchModel(parseInt(fav.value.il), this.searchIsModel, null );

    console.log(model);


    this._post.searchWorker(JSON.stringify(model)).then(profiles => this.setProfiles(profiles));
    
  }




  /* FILTER OPERATIONS */

  clearFilter(){
  	
  	this.cinsiyet = '4';
  	this.kucuk = null;
  	this.buyuk = null;
  	this.selectedDrivers = [];
  	this.selectedMilitary = [];
  	this.selectedEducation = [];
  	this.profiles.data = this.filterClear;
  }
  clearGender(){
  	this.cinsiyet = '4';
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
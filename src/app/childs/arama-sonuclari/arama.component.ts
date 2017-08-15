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


	filterClear: any = {};

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

		    jQuery(function() {
			    var monkeyList = new List('products', {
			      valueNames: ['name'],
			      page: 9,
			      pagination: true
			    });

				});
	  	});
	}

	ngOnInit() {
		
		this.il = -10;
		this.jobcat = -10;
		this.cinsiyet = 4;

		this.genders = this._pub.getGenderTypes().then(genders => this.genders = genders);
		this.education = this._pub.getEducationTypes().then(education => this.education = education);

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

  		this.military = this._pub.getMilitaryChoices().then(military => this.military = military);
  		this.jobcategory = this._pub.getJobCategories().then(jobcategory => this.jobcategory = jobcategory);
  		this.cities = this._pub.getCities().then(cities => this.cities = cities);
  		this.driver = this._pub.getDriverLicenseTypes().then(driver => this.driver = driver);
	    
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
  		this.filterClear = param;
  		console.log(this.profiles);
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
  	this.profiles = this.filterClear;
  }
  clearGender(){
  	this.cinsiyet = '4';
  }

  onChangeGender(e){
  	let temp = [];
  	if(e==='1' || e==='2'){

  		
  	}else{
  	
  	}
  }
  
  	
}
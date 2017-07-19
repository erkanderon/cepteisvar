import { ElementRef, Component, ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
declare var jQuery : any;
declare var List : any;

@Component({
  moduleId: module.id,
  selector: 'arama-comp',
  templateUrl: './arama.component.html',
  styleUrls: ['./arama.component.css'],
  providers: [Pub]
})
export class AramaComponent {

	profiles: any = {};
	model: any = [];
	saveUsername: any = false;

	constructor(private elRef : ElementRef, private _pub: Pub,) { 

		jQuery(document).ready(function () {
	  		jQuery("#ss").slick({"slidesToShow": 4, "slidesToScroll": 1, "speed": 300, "infinite": true, "lazyLoad": 'ondemand'});


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

	    this.profiles = this._pub.getHomepageMembers().then(profiles => this.profiles = profiles);

	    
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

	
  
  	
}
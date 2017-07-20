import { ElementRef, Component , ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';

import {Return} from '../../models/return.model'
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'about-us',
  templateUrl: './hakkimizda.component.html',
  styleUrls: ['./hakkimizda.component.css'],
 
})
export class AboutUsComponent {
	
	fields: any;
	obj: any;

	

	constructor(private elRef : ElementRef, private _pub: Pub) { 

		// JQuery Defines
		jQuery(document).ready(function () {

			/*jQuery("#ss").slick(
		  		{
			  		"slidesToShow": 4, 
			  		"slidesToScroll": 1, 
			  		"speed": 300, 
			  		"infinite": true, 
			  		"lazyLoad": 'ondemand'
		  		}
	  		);*/
			
	  		
			jQuery("#firms").slick({"slidesToShow": 8, "slidesToScroll": 1, "speed": 300, "infinite": true, "lazyLoad": 'ondemand'});
  		});
  		// JQuery finished
	}
	ngOnInit() {

	    this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));
	}
	ngAfterContentInit() {

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
}
import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
declare var List : any;

@Component({
  moduleId: module.id,
  selector: 'arama-comp',
  templateUrl: './arama.component.html',
  styleUrls: ['./arama.component.css']
})
export class AramaComponent {

	constructor(private elRef : ElementRef) { 
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
  
  	
}
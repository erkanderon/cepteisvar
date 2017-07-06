import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
declare var List : any;
@Component({
  moduleId: module.id,
  selector: 'duyurular-comp',
  templateUrl: './duyurular.component.html',
  styleUrls: ['./duyurular.component.css']
})
export class DuyurularComponent {

	constructor(private elRef : ElementRef) { 
		jQuery(document).ready(function () {

	  		jQuery(function() {
			    var newsList = new List('news', {
			      valueNames: ['duyurular'],
			      page: 4,
			      pagination: true
			    });

			});
  		});
	}
  
  	
}
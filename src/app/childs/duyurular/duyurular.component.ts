import { ElementRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';

declare var jQuery : any;
declare var List : any;
@Component({
  moduleId: module.id,
  selector: 'duyurular-comp',
  templateUrl: './duyurular.component.html',
  styleUrls: ['./duyurular.component.css'],

})
export class DuyurularComponent {

	news: any = {};

	constructor(private elRef : ElementRef, private _pub: Pub) { 
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

	ngOnInit() {
		
	    this.news = this._pub.getNews().then(res => this.news = res);

  	}
	
  	
}
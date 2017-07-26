import { ElementRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';

declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'duyurular-rightside-comp',
  templateUrl: './duyurular.rightside.html',
  styleUrls: ['./duyurular.rightside.css']
})
export class DuyurularRightSideComponent {
  
  	news: any = {};

	constructor(private elRef : ElementRef, private _pub: Pub, private router: Router) { 
		jQuery(document).ready(function () {

	  		
  		});
	}

	ngOnInit() {
		
	    this.news = this._pub.getNews().then(res => this.news = res);

	    

  	}
  	
}
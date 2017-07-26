import { ElementRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';

@Component({
  moduleId: module.id,
  selector: 'duyuru-comp',
  templateUrl: './duyuru.component.html',
  styleUrls: ['./duyuru.component.css'],
  
})
export class DuyuruComponent {



	sub: any;
	id: any ="";
	new: any={};
	news: any={};


	constructor( private route: ActivatedRoute, private _pub: Pub, private router: Router) { 

		this.sub = this.route.params.subscribe(params => {
	       this.id = +params['id']; // (+) converts string 'id' to a number
	       
	       // In a real app: dispatch action to load the details here.
	    });

		
		
	}


	ngOnInit() {
		this.router.events
		    .subscribe((event) => {
		      // example: NavigationStart, RoutesRecognized, NavigationEnd
		      	this.sub = this.route.params.subscribe(params => {
			       this.id = +params['id']; // (+) converts string 'id' to a number
			       
			       // In a real app: dispatch action to load the details here.
			       this.new = this._pub.getNew(this.id).then(res => this.new = res);
	    		   
			    });
		      console.log(event);
		      console.log(this.id);
		    });

	    this.news = this._pub.getNews().then(res => this.news = res);

	    console.log(this.new);
  	}
  
  	
}
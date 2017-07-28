import { ElementRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Pub } from '../../services/pub.service';

@Component({
  moduleId: module.id,
  selector: 'duyuru-comp',
  templateUrl: './duyuru.component.html',
  styleUrls: ['./duyuru.component.css'],
  providers: [AuthService]
  
})
export class DuyuruComponent {



	sub: any;
	id: any ="";
	new: any={};
	news: any={};
	comments: any={};
	isloggedin: any=false;


	constructor( private route: ActivatedRoute, private _pub: Pub, private router: Router, private _post: PostService, private _auth: AuthService) { 

		this.sub = this.route.params.subscribe(params => {
	       this.id = +params['id']; // (+) converts string 'id' to a number
	       
	       // In a real app: dispatch action to load the details here.
	    });

		this.isloggedin = (this._auth.isLoggedIn());
		
	}


	ngOnInit() {
		this.router.events
		    .subscribe((event) => {
		      // example: NavigationStart, RoutesRecognized, NavigationEnd
		      	this.sub = this.route.params.subscribe(params => {
			       this.id = +params['id']; // (+) converts string 'id' to a number
			       this.getComments(this.id)
			       
			       // In a real app: dispatch action to load the details here.
			       this.new = this._pub.getNew(this.id).then(res => this.new = res);
			       
	    		   
			    });
		      
		    });

	    this.news = this._pub.getNews().then(res => this.news = res);

  	}
  	getComments(id){
  		this.comments = this._post.getListNewsComment({ "p_haber_id": id }).then(res => this.comments = res);
  	}
  
  	
}
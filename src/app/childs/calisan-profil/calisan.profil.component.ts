import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { PreviewMemberModel } from '../../models/previewMemberAccount.model';
import { PostService } from '../../services/post.service';



@Component({
  moduleId: module.id,
  selector: 'calisanprofil-comp',
  templateUrl: './calisan.profil.component.html',
  styleUrls: ['./calisan.profil.component.css']
})


export class CalisanProfilComponent {
	

	sub: any;
	id: any ="";

	constructor( private route: ActivatedRoute, private _pub: Pub, private router: Router, private _post: PostService, private _authService: AuthService) { 



		this.sub = this.route.params.subscribe(params => {
	       //this.id = +params['id']; // (+) converts string 'id' to a number
	       //this.member = new PreviewMemberModel();
	       
	       // In a real app: dispatch action to load the details here.
	    });

		
		
	}

	ngOnInit() {

	    //this.news = this._pub.getNews().then(res => this.news = res);

	    //console.log(this.new);
  	}

}
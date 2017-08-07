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
	profile: any ={};
	comments: any={};
	model: any=[];
	islogged: any=false;

	constructor( private route: ActivatedRoute, private _pub: Pub, private router: Router, private _post: PostService, private _authService: AuthService) { 



		this.sub = this.route.params.subscribe(params => {
	       this.id = +params['id']; // (+) converts string 'id' to a number
	       //this.member = new PreviewMemberModel();
	       this.getProfile(this.id);
	       console.log(this.profile);
	       // In a real app: dispatch action to load the details here.
	    });

		
		
	}

	ngOnInit() {

	    //this.news = this._pub.getNews().then(res => this.news = res);

	    //console.log(this.new);
  	}

  	getProfile(id){
  		this.profile = this._post.showMemberPrivateAccount({ "p_member_id": this.id}).then(res => this.getop(res));
  	}
  	getop(res){
  		if(res){
	    	if(res.data){
	    		this.profile = res;
	    		this.comments = this._post.getMemberCommentsOthers({ "p_userid": this.id}).then(res => this.comments = res);

	    	}
	    }
  	}
  	checkCompanyForSMS(user){
		this.islogged = (this._authService.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
		console.log(this.islogged);
		if(this.islogged){
			this.model.push(user);
			this.createSepet();
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	createSepet(){
		
		this._pub.sepetModel = this.model;
		this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);

	}

}
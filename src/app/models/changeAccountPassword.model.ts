export class ChangeAccountPasswordModel {

	public p_userid: string;
	public p_group_id: string;
	public P_OLD_PASSWORD: string;
	public P_NEW_PASSWD: string;

    constructor(

		p_userid: any,
		p_group_id: any,
		P_OLD_PASSWORD: any,
		P_NEW_PASSWD: any,
    ) { 
    	this.p_userid = p_userid;
    	this.p_group_id = p_group_id;
    	this.P_OLD_PASSWORD = P_OLD_PASSWORD;
    	this.P_NEW_PASSWD = P_NEW_PASSWD;
    }   
}
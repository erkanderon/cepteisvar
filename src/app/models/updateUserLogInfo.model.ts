export class UpdateUserLoginModel {

	public p_userid: string;
	public P_GROUP_ID: string;
	public P_SESSION_ID: string;
	public P_LOGIN_TYPE: string;


    constructor(

		p_userid: any,
		P_GROUP_ID: any,
		P_SESSION_ID: any,
		P_LOGIN_TYPE: any
    ) { 
    	this.p_userid = p_userid;
    	this.P_GROUP_ID = P_GROUP_ID;
    	this.P_SESSION_ID = P_SESSION_ID;
    	this.P_LOGIN_TYPE = P_LOGIN_TYPE;
    }   
}
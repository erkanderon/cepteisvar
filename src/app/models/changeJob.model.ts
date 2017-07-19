export class ChangeJobModel {

	public p_userid: string;
	public P_PRIMARY_JOB: string;
	public P_SECONDARY_JOB: string;
	public P_PRIMARY_JOB_DESC: string;
	public P_SECONDARY_JOB_DESC: string;


    constructor(

		p_userid: any,
		P_PRIMARY_JOB: any,
		P_SECONDARY_JOB: any,
		P_PRIMARY_JOB_DESC: any,
		P_SECONDARY_JOB_DESC: any,
    ) { 
    	this.p_userid = p_userid;
    	this.P_PRIMARY_JOB = P_PRIMARY_JOB;
    	this.P_SECONDARY_JOB = P_SECONDARY_JOB;
    	this.P_PRIMARY_JOB_DESC = P_PRIMARY_JOB_DESC;
    	this.P_SECONDARY_JOB_DESC = P_SECONDARY_JOB_DESC;
    }   
}
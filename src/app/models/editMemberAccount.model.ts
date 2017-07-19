export class EditMemberAccountModel {

	public p_userid: string;
    public P_NAME: string;
    public P_SURNAME: number;
    public P_GENDER: number;
    public P_ADDRESS: string;
    public P_CITY: number;
    public P_CONTACT_NO: string;
    public P_COUNTY: number;
    public P_EDUCATION_TYPE: number;
    public P_BDAY: string;
    public P_HOMEPAGE_ACTIVE: number;
    public P_ALLOW_SMS: number;
    public P_WORK_EXPERIENCE: string;
    public P_CERTIFICATE: number;
    public P_DRIVER_LICENSE: number;
    public P_MILITARY_STATUS: number;


    constructor(

		p_userid: any, 
	    P_NAME: any, 
        P_SURNAME: any,
		P_GENDER: any, 
		P_ADDRESS: any, 
        P_CITY: any,
        P_CONTACT_NO: any,
        P_COUNTY: any, 
        P_EDUCATION_TYPE: any,
        P_BDAY: any, 
		P_HOMEPAGE_ACTIVE: any, 
        P_ALLOW_SMS: any,
        P_WORK_EXPERIENCE: any,
        P_CERTIFICATE: any,
        P_DRIVER_LICENSE: any,
        P_MILITARY_STATUS: any,
    ) { 
        this.p_userid = p_userid;
    	this.P_NAME = P_NAME;
    	this.P_SURNAME = P_SURNAME
    	this.P_GENDER = P_GENDER
    	this.P_ADDRESS = P_ADDRESS
    	this.P_EDUCATION_TYPE = P_EDUCATION_TYPE
    	this.P_CITY = P_CITY
    	this.P_BDAY = P_BDAY
    	this.P_CONTACT_NO = P_CONTACT_NO
    	this.P_COUNTY = P_COUNTY
    	this.P_HOMEPAGE_ACTIVE = P_HOMEPAGE_ACTIVE
    	this.P_ALLOW_SMS = P_ALLOW_SMS
        this.P_DRIVER_LICENSE = P_DRIVER_LICENSE
        this.P_MILITARY_STATUS = P_MILITARY_STATUS
        this.P_WORK_EXPERIENCE = P_WORK_EXPERIENCE
        this.P_CERTIFICATE = P_CERTIFICATE
    }   
}
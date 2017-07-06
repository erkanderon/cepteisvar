export class Employee {

	public P_NAME: string;
    public P_SURNAME: string;
    public P_GENDER: string;
    public P_ADDRESS: string;
    public P_CITY: string;
    public P_EMAIL: string;
    public P_CONTACT_NO: string;
    public P_COUNTY: number;
    public P_EDUCATION_TYPE: string;
    public P_BDAY: string;
    public P_HOMEPAGE_ACTIVE: string;
    public P_ALLOW_SMS: string;
    public P_PRIMARY_JOB: string;
    public P_SECONDARY_JOB: string;
    public P_WORK_EXPERIENCE: string;
    public P_CERTIFICATE: string;
    public P_PWD: string;

    constructor(

		P_NAME: any, 
	    P_SURNAME: any, 
		P_GENDER: any, 
		P_ADDRESS: any, 
		P_EDUCATION_TYPE: any, 
		P_CITY: any, 
		P_EMAIL: any, 
		P_BDAY: any, 
		P_CONTACT_NO: any, 
		P_COUNTY: any, 
		P_HOMEPAGE_ACTIVE: any, 
        P_ALLOW_SMS: any,
        P_PRIMARY_JOB: any,
        P_SECONDARY_JOB: any,
        P_WORK_EXPERIENCE: any,
        P_CERTIFICATE: any,
		P_PWD: any 
    ) { 
    	this.P_NAME = P_NAME;
    	this.P_SURNAME = P_SURNAME
    	this.P_GENDER = P_GENDER
    	this.P_ADDRESS = P_ADDRESS
    	this.P_EDUCATION_TYPE = P_EDUCATION_TYPE
    	this.P_CITY = P_CITY
    	this.P_EMAIL = P_EMAIL
    	this.P_BDAY = P_BDAY
    	this.P_CONTACT_NO = P_CONTACT_NO
    	this.P_COUNTY = P_COUNTY
    	this.P_HOMEPAGE_ACTIVE = P_HOMEPAGE_ACTIVE
    	this.P_ALLOW_SMS = P_ALLOW_SMS
        this.P_PRIMARY_JOB = P_PRIMARY_JOB
        this.P_SECONDARY_JOB = P_SECONDARY_JOB
        this.P_WORK_EXPERIENCE = P_WORK_EXPERIENCE
        this.P_CERTIFICATE = P_CERTIFICATE
        this.P_PWD = P_PWD
    }   
}
export class Employee {

	public P_NAME: string;
    public P_SURNAME: string;
    public P_GENDER: number;
    public P_ADDRESS: string;
    public P_CITY: number;
    public p_email: string;
    public p_contact_no: string;
    public P_COUNTY: number;
    public P_EDUCATION_TYPE: number;
    public P_BDAY: string;
    public P_HOMEPAGE_ACTIVE: number;
    public P_ALLOW_SMS: number;
    public P_PRIMARY_JOB: number;
    public P_SECONDARY_JOB: number;
    public P_WORK_EXPERIENCE: string;
    public P_CERTIFICATE: number;
    public P_LICENSE_TYPE: number;
    public P_MILITARY_STATUS: number;
    public P_PWD: string;

    constructor(

		P_NAME: any, 
	    P_SURNAME: any, 
		P_GENDER: any, 
		P_ADDRESS: any, 
        P_CITY: any,
		p_email: any,
        p_contact_no: any,
        P_COUNTY: any, 
        P_EDUCATION_TYPE: any,
        P_BDAY: any, 
		P_HOMEPAGE_ACTIVE: any, 
        P_ALLOW_SMS: any,
        P_PRIMARY_JOB: any,
        P_SECONDARY_JOB: any,
        P_WORK_EXPERIENCE: any,
        P_CERTIFICATE: any,
        P_LICENSE_TYPE: any,
        P_MILITARY_STATUS: any,
		P_PWD: any 
    ) { 
    	this.P_NAME = P_NAME;
    	this.P_SURNAME = P_SURNAME
    	this.P_GENDER = P_GENDER
    	this.P_ADDRESS = P_ADDRESS
    	this.P_EDUCATION_TYPE = P_EDUCATION_TYPE
    	this.P_CITY = P_CITY
    	this.p_email = p_email
    	this.P_BDAY = P_BDAY
    	this.p_contact_no = p_contact_no
    	this.P_COUNTY = P_COUNTY
    	this.P_HOMEPAGE_ACTIVE = P_HOMEPAGE_ACTIVE
    	this.P_ALLOW_SMS = P_ALLOW_SMS
        this.P_PRIMARY_JOB = P_PRIMARY_JOB
        this.P_SECONDARY_JOB = P_SECONDARY_JOB
        this.P_WORK_EXPERIENCE = P_WORK_EXPERIENCE
        this.P_CERTIFICATE = P_CERTIFICATE
        this.P_LICENSE_TYPE = P_LICENSE_TYPE
        this.P_MILITARY_STATUS = P_MILITARY_STATUS
        this.P_PWD = P_PWD
    }   
}
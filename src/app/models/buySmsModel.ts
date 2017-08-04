export class BuySmsModel {

	public p_company_id: string;
	public p_packet_id: string;
	public p_sms_count: string;

    constructor(

		p_company_id: any,
		p_packet_id: any,
		p_sms_count: any
    ) { 
    	this.p_company_id = p_company_id;
    	this.p_packet_id = p_packet_id;
    	this.p_sms_count = p_sms_count;
    }   
}

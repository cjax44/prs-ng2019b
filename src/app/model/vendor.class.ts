export class Vendor {
    id: number;
	code: string;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	phoneNumber: string;
	email: string;
	isPreApproved: boolean;
    
    
    constructor(id:number=0,code:string="",name:string="",address:string="",city:string="",state:string="",zip:string="", 
                phoneNumber:string="",email:string="",isPreApproved:boolean=false) {

                }

    about(): string {
        return "Vendor id="+this.id+", code="+this.code+", name="+this.code+", address="+this.address+", city="+this.city+", state="
                +this.state+", zip="+this.zip+", phone="+this.phoneNumber+", email="+this.email+", pre?="+this.isPreApproved;
    }
}
import { Vendor } from './vendor.class';

export class Product {
    id: number;
    vendor: Vendor;
	partNumber: string;
	name: string;
	price: number;
	unit: string;
	photoPath: string;

    constructor(id:number=0, vendor:Vendor=null,partNumber:string="",name:string="",price:number=0,
                unit:string="",photopath:string="") {

    }

    about(): string {
        return "Product: id="+this.id+", vendor="+this.vendor+", pn="+this.partNumber+", name="+this.name+", price="
                +this.price+", unit="+this.unit+", photo="+this.photoPath;
    }
}
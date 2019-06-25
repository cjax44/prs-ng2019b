import { PurchaseRequest } from './purchase-request.class';
import { Product } from './product.class';

export class Prli {

    id: number;
    purchaseRequest: PurchaseRequest;
    product: Product;
    quantity: number;
    
    

    constructor(id: number=0, purchaseRequest: PurchaseRequest=null, product: Product=null, quantity: number=0) {

        this.id = id;
        this.purchaseRequest = purchaseRequest;
        this.product = product;
        this.quantity = quantity;
        
        

    }

    about(): string {
        return "PRLI: id=" + this.id + ", pr=" + this.purchaseRequest + ", prod=" + this.product + ", qty=" + this.quantity;
    }
}

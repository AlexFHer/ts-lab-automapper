export class ToyClass {
  name: string;
  price: number;
  VPOPrice: number;
  isAvailable: boolean;

  constructor(_name: string, _price: number, _VPOPrice: number, _isAvailable: boolean) {
    this.name = _name;
    this.price = _price;
    this.VPOPrice = _VPOPrice;
    this.isAvailable = _isAvailable;
  }
}

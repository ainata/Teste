import BaseModel from "./base-model";

export class Product extends BaseModel {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: string
  }

  constructor(args: {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating: {
      rate: string
    }
  }) {
    super(args);
    this.id = args.id;
    this.title = args.title;
    this.price = args.price;
    this.category = args.category;
    this.description = args.description;
    this.image = args.image;
    this.rating = args.rating;
  }
}


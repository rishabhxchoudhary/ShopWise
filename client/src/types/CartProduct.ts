interface CartProduct {
    _id: string;
    name: string;
    image: string;
    variant: {
      option: string;
      value: string;
    }[];
    price: number;
    quantity: number;
}
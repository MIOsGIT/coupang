export class user_findone_response_dto {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    isSeller: boolean;
    products: {
        productnumber: number;
        name: string;
        price: number;
        stock: number;
    }[];
}
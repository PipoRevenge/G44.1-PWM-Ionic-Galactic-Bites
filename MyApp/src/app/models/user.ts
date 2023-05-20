export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    points: number;
    shoppingCart: Map<string, number>;
}
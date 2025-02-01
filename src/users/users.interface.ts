export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    address: string;
    age: number;
    gender: number;
    company: {
        _id: string;
        name: string;
    };
}

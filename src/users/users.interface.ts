export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    age: number;
    gender: number;
    company: {
        _id: string;
        name: string;
    };
    role: {
        _id: string;
        name: string;
    };
    permissions?: {
        _id: string;
        name: string;
        apiPath: string;
        module: string;
    }[];
}

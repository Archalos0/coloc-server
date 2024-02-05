import { Role } from "../../utils/enum";

export interface User {
    ID: number;
    email: string;
    firstName: string;
    role: Role;
    password: string;

    lastName?: string;
    description?: string;
    photo?: string;
    
}
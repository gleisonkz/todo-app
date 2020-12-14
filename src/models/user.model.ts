import { UserStatus } from './enums.model';
export interface User {
    userID: number,
    name: string,
    email: string,
    password: string   
    status: UserStatus
}

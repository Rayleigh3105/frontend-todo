import {Token} from "./token";


export interface User {
    _id?        : number,
    email       : String,
    password    : String,
    tokens?     : [Token],
}

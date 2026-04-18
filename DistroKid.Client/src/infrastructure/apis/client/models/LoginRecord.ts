













import { mapValues } from '../runtime';





export interface LoginRecord {
    




    email: string;
    




    password: string;
}




export function instanceOfLoginRecord(value: object): value is LoginRecord {
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    return true;
}

export function LoginRecordFromJSON(json: any): LoginRecord {
    return LoginRecordFromJSONTyped(json, false);
}

export function LoginRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function LoginRecordToJSON(json: any): LoginRecord {
    return LoginRecordToJSONTyped(json, false);
}

export function LoginRecordToJSONTyped(value?: LoginRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'email': value['email'],
        'password': value['password'],
    };
}


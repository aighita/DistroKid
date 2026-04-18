













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';






export interface LoginResponseRecord {
    




    token: string;
    




    user: UserRecord;
}




export function instanceOfLoginResponseRecord(value: object): value is LoginResponseRecord {
    if (!('token' in value) || value['token'] === undefined) return false;
    if (!('user' in value) || value['user'] === undefined) return false;
    return true;
}

export function LoginResponseRecordFromJSON(json: any): LoginResponseRecord {
    return LoginResponseRecordFromJSONTyped(json, false);
}

export function LoginResponseRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginResponseRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'],
        'user': UserRecordFromJSON(json['user']),
    };
}

export function LoginResponseRecordToJSON(json: any): LoginResponseRecord {
    return LoginResponseRecordToJSONTyped(json, false);
}

export function LoginResponseRecordToJSONTyped(value?: LoginResponseRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'token': value['token'],
        'user': UserRecordToJSON(value['user']),
    };
}


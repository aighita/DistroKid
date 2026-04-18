













import { mapValues } from '../runtime';
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
    UserRoleEnumToJSONTyped,
} from './UserRoleEnum';






export interface UserAddRecord {
    




    name: string;
    




    email: string;
    




    password: string;
    




    role: UserRoleEnum;
}






export function instanceOfUserAddRecord(value: object): value is UserAddRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    return true;
}

export function UserAddRecordFromJSON(json: any): UserAddRecord {
    return UserAddRecordFromJSONTyped(json, false);
}

export function UserAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'password': json['password'],
        'role': UserRoleEnumFromJSON(json['role']),
    };
}

export function UserAddRecordToJSON(json: any): UserAddRecord {
    return UserAddRecordToJSONTyped(json, false);
}

export function UserAddRecordToJSONTyped(value?: UserAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'email': value['email'],
        'password': value['password'],
        'role': UserRoleEnumToJSON(value['role']),
    };
}


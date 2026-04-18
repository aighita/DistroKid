













import { mapValues } from '../runtime';
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
    UserRoleEnumToJSONTyped,
} from './UserRoleEnum';






export interface UserRecord {
    




    id: string;
    




    name: string;
    




    email: string;
    




    role: UserRoleEnum;
}






export function instanceOfUserRecord(value: object): value is UserRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    return true;
}

export function UserRecordFromJSON(json: any): UserRecord {
    return UserRecordFromJSONTyped(json, false);
}

export function UserRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'email': json['email'],
        'role': UserRoleEnumFromJSON(json['role']),
    };
}

export function UserRecordToJSON(json: any): UserRecord {
    return UserRecordToJSONTyped(json, false);
}

export function UserRecordToJSONTyped(value?: UserRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'email': value['email'],
        'role': UserRoleEnumToJSON(value['role']),
    };
}


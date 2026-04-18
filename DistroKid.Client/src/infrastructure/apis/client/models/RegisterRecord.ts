













import { mapValues } from '../runtime';
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
    UserRoleEnumToJSONTyped,
} from './UserRoleEnum';






export interface RegisterRecord {
    




    name: string;
    




    email: string;
    




    password: string;
    




    confirmPassword: string;
    




    role: UserRoleEnum;
    




    bio?: string | null;
    




    socialMediaLink?: string | null;
}






export function instanceOfRegisterRecord(value: object): value is RegisterRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    if (!('confirmPassword' in value) || value['confirmPassword'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    return true;
}

export function RegisterRecordFromJSON(json: any): RegisterRecord {
    return RegisterRecordFromJSONTyped(json, false);
}

export function RegisterRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'password': json['password'],
        'confirmPassword': json['confirmPassword'],
        'role': UserRoleEnumFromJSON(json['role']),
        'bio': json['bio'] == null ? undefined : json['bio'],
        'socialMediaLink': json['socialMediaLink'] == null ? undefined : json['socialMediaLink'],
    };
}

export function RegisterRecordToJSON(json: any): RegisterRecord {
    return RegisterRecordToJSONTyped(json, false);
}

export function RegisterRecordToJSONTyped(value?: RegisterRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'email': value['email'],
        'password': value['password'],
        'confirmPassword': value['confirmPassword'],
        'role': UserRoleEnumToJSON(value['role']),
        'bio': value['bio'],
        'socialMediaLink': value['socialMediaLink'],
    };
}


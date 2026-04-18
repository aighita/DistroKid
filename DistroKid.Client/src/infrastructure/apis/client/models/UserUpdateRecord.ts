













import { mapValues } from '../runtime';





export interface UserUpdateRecord {
    




    id: string;
    




    name?: string | null;
    




    password?: string | null;
}




export function instanceOfUserUpdateRecord(value: object): value is UserUpdateRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function UserUpdateRecordFromJSON(json: any): UserUpdateRecord {
    return UserUpdateRecordFromJSONTyped(json, false);
}

export function UserUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'] == null ? undefined : json['name'],
        'password': json['password'] == null ? undefined : json['password'],
    };
}

export function UserUpdateRecordToJSON(json: any): UserUpdateRecord {
    return UserUpdateRecordToJSONTyped(json, false);
}

export function UserUpdateRecordToJSONTyped(value?: UserUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'password': value['password'],
    };
}


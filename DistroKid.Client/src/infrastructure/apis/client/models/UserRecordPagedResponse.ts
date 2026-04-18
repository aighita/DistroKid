













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';






export interface UserRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<UserRecord>;
}




export function instanceOfUserRecordPagedResponse(value: object): value is UserRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function UserRecordPagedResponseFromJSON(json: any): UserRecordPagedResponse {
    return UserRecordPagedResponseFromJSONTyped(json, false);
}

export function UserRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(UserRecordFromJSON)),
    };
}

export function UserRecordPagedResponseToJSON(json: any): UserRecordPagedResponse {
    return UserRecordPagedResponseToJSONTyped(json, false);
}

export function UserRecordPagedResponseToJSONTyped(value?: UserRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(UserRecordToJSON)),
    };
}


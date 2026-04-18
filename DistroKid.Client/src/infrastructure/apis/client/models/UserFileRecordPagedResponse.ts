













import { mapValues } from '../runtime';
import type { UserFileRecord } from './UserFileRecord';
import {
    UserFileRecordFromJSON,
    UserFileRecordFromJSONTyped,
    UserFileRecordToJSON,
    UserFileRecordToJSONTyped,
} from './UserFileRecord';






export interface UserFileRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<UserFileRecord>;
}




export function instanceOfUserFileRecordPagedResponse(value: object): value is UserFileRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function UserFileRecordPagedResponseFromJSON(json: any): UserFileRecordPagedResponse {
    return UserFileRecordPagedResponseFromJSONTyped(json, false);
}

export function UserFileRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserFileRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(UserFileRecordFromJSON)),
    };
}

export function UserFileRecordPagedResponseToJSON(json: any): UserFileRecordPagedResponse {
    return UserFileRecordPagedResponseToJSONTyped(json, false);
}

export function UserFileRecordPagedResponseToJSONTyped(value?: UserFileRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(UserFileRecordToJSON)),
    };
}


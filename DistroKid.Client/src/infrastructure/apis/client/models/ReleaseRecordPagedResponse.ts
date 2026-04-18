













import { mapValues } from '../runtime';
import type { ReleaseRecord } from './ReleaseRecord';
import {
    ReleaseRecordFromJSON,
    ReleaseRecordFromJSONTyped,
    ReleaseRecordToJSON,
    ReleaseRecordToJSONTyped,
} from './ReleaseRecord';






export interface ReleaseRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<ReleaseRecord>;
}




export function instanceOfReleaseRecordPagedResponse(value: object): value is ReleaseRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function ReleaseRecordPagedResponseFromJSON(json: any): ReleaseRecordPagedResponse {
    return ReleaseRecordPagedResponseFromJSONTyped(json, false);
}

export function ReleaseRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(ReleaseRecordFromJSON)),
    };
}

export function ReleaseRecordPagedResponseToJSON(json: any): ReleaseRecordPagedResponse {
    return ReleaseRecordPagedResponseToJSONTyped(json, false);
}

export function ReleaseRecordPagedResponseToJSONTyped(value?: ReleaseRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(ReleaseRecordToJSON)),
    };
}


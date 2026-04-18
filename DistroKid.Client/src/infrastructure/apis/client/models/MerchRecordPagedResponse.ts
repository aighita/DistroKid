













import { mapValues } from '../runtime';
import type { MerchRecord } from './MerchRecord';
import {
    MerchRecordFromJSON,
    MerchRecordFromJSONTyped,
    MerchRecordToJSON,
    MerchRecordToJSONTyped,
} from './MerchRecord';






export interface MerchRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<MerchRecord>;
}




export function instanceOfMerchRecordPagedResponse(value: object): value is MerchRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function MerchRecordPagedResponseFromJSON(json: any): MerchRecordPagedResponse {
    return MerchRecordPagedResponseFromJSONTyped(json, false);
}

export function MerchRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerchRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(MerchRecordFromJSON)),
    };
}

export function MerchRecordPagedResponseToJSON(json: any): MerchRecordPagedResponse {
    return MerchRecordPagedResponseToJSONTyped(json, false);
}

export function MerchRecordPagedResponseToJSONTyped(value?: MerchRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(MerchRecordToJSON)),
    };
}
















import { mapValues } from '../runtime';
import type { EventRecord } from './EventRecord';
import {
    EventRecordFromJSON,
    EventRecordFromJSONTyped,
    EventRecordToJSON,
    EventRecordToJSONTyped,
} from './EventRecord';






export interface EventRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<EventRecord>;
}




export function instanceOfEventRecordPagedResponse(value: object): value is EventRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function EventRecordPagedResponseFromJSON(json: any): EventRecordPagedResponse {
    return EventRecordPagedResponseFromJSONTyped(json, false);
}

export function EventRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(EventRecordFromJSON)),
    };
}

export function EventRecordPagedResponseToJSON(json: any): EventRecordPagedResponse {
    return EventRecordPagedResponseToJSONTyped(json, false);
}

export function EventRecordPagedResponseToJSONTyped(value?: EventRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(EventRecordToJSON)),
    };
}
















import { mapValues } from '../runtime';
import type { EventRecord } from './EventRecord';
import {
    EventRecordFromJSON,
    EventRecordFromJSONTyped,
    EventRecordToJSON,
    EventRecordToJSONTyped,
} from './EventRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface EventRecordRequestResponse {
    




    readonly response?: EventRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfEventRecordRequestResponse(value: object): value is EventRecordRequestResponse {
    return true;
}

export function EventRecordRequestResponseFromJSON(json: any): EventRecordRequestResponse {
    return EventRecordRequestResponseFromJSONTyped(json, false);
}

export function EventRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : EventRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function EventRecordRequestResponseToJSON(json: any): EventRecordRequestResponse {
    return EventRecordRequestResponseToJSONTyped(json, false);
}

export function EventRecordRequestResponseToJSONTyped(value?: Omit<EventRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


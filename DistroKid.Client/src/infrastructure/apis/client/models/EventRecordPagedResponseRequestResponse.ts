













import { mapValues } from '../runtime';
import type { EventRecordPagedResponse } from './EventRecordPagedResponse';
import {
    EventRecordPagedResponseFromJSON,
    EventRecordPagedResponseFromJSONTyped,
    EventRecordPagedResponseToJSON,
    EventRecordPagedResponseToJSONTyped,
} from './EventRecordPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface EventRecordPagedResponseRequestResponse {
    




    readonly response?: EventRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfEventRecordPagedResponseRequestResponse(value: object): value is EventRecordPagedResponseRequestResponse {
    return true;
}

export function EventRecordPagedResponseRequestResponseFromJSON(json: any): EventRecordPagedResponseRequestResponse {
    return EventRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function EventRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : EventRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function EventRecordPagedResponseRequestResponseToJSON(json: any): EventRecordPagedResponseRequestResponse {
    return EventRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function EventRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<EventRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


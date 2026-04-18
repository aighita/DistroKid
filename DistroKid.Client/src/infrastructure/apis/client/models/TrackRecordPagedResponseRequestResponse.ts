













import { mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';
import type { TrackRecordPagedResponse } from './TrackRecordPagedResponse';
import {
    TrackRecordPagedResponseFromJSON,
    TrackRecordPagedResponseFromJSONTyped,
    TrackRecordPagedResponseToJSON,
    TrackRecordPagedResponseToJSONTyped,
} from './TrackRecordPagedResponse';






export interface TrackRecordPagedResponseRequestResponse {
    




    readonly response?: TrackRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfTrackRecordPagedResponseRequestResponse(value: object): value is TrackRecordPagedResponseRequestResponse {
    return true;
}

export function TrackRecordPagedResponseRequestResponseFromJSON(json: any): TrackRecordPagedResponseRequestResponse {
    return TrackRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function TrackRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : TrackRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function TrackRecordPagedResponseRequestResponseToJSON(json: any): TrackRecordPagedResponseRequestResponse {
    return TrackRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function TrackRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<TrackRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


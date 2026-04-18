













import { mapValues } from '../runtime';
import type { TrackRecord } from './TrackRecord';
import {
    TrackRecordFromJSON,
    TrackRecordFromJSONTyped,
    TrackRecordToJSON,
    TrackRecordToJSONTyped,
} from './TrackRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface TrackRecordRequestResponse {
    




    readonly response?: TrackRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfTrackRecordRequestResponse(value: object): value is TrackRecordRequestResponse {
    return true;
}

export function TrackRecordRequestResponseFromJSON(json: any): TrackRecordRequestResponse {
    return TrackRecordRequestResponseFromJSONTyped(json, false);
}

export function TrackRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : TrackRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function TrackRecordRequestResponseToJSON(json: any): TrackRecordRequestResponse {
    return TrackRecordRequestResponseToJSONTyped(json, false);
}

export function TrackRecordRequestResponseToJSONTyped(value?: Omit<TrackRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


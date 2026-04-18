













import { mapValues } from '../runtime';
import type { LabelRecord } from './LabelRecord';
import {
    LabelRecordFromJSON,
    LabelRecordFromJSONTyped,
    LabelRecordToJSON,
    LabelRecordToJSONTyped,
} from './LabelRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface LabelRecordRequestResponse {
    




    readonly response?: LabelRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfLabelRecordRequestResponse(value: object): value is LabelRecordRequestResponse {
    return true;
}

export function LabelRecordRequestResponseFromJSON(json: any): LabelRecordRequestResponse {
    return LabelRecordRequestResponseFromJSONTyped(json, false);
}

export function LabelRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : LabelRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function LabelRecordRequestResponseToJSON(json: any): LabelRecordRequestResponse {
    return LabelRecordRequestResponseToJSONTyped(json, false);
}

export function LabelRecordRequestResponseToJSONTyped(value?: Omit<LabelRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


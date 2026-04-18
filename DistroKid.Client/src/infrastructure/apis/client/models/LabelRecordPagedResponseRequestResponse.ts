













import { mapValues } from '../runtime';
import type { LabelRecordPagedResponse } from './LabelRecordPagedResponse';
import {
    LabelRecordPagedResponseFromJSON,
    LabelRecordPagedResponseFromJSONTyped,
    LabelRecordPagedResponseToJSON,
    LabelRecordPagedResponseToJSONTyped,
} from './LabelRecordPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface LabelRecordPagedResponseRequestResponse {
    




    readonly response?: LabelRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfLabelRecordPagedResponseRequestResponse(value: object): value is LabelRecordPagedResponseRequestResponse {
    return true;
}

export function LabelRecordPagedResponseRequestResponseFromJSON(json: any): LabelRecordPagedResponseRequestResponse {
    return LabelRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function LabelRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : LabelRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function LabelRecordPagedResponseRequestResponseToJSON(json: any): LabelRecordPagedResponseRequestResponse {
    return LabelRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function LabelRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<LabelRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


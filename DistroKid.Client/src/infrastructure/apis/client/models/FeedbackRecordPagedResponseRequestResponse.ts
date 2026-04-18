













import { mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';
import type { FeedbackRecordPagedResponse } from './FeedbackRecordPagedResponse';
import {
    FeedbackRecordPagedResponseFromJSON,
    FeedbackRecordPagedResponseFromJSONTyped,
    FeedbackRecordPagedResponseToJSON,
    FeedbackRecordPagedResponseToJSONTyped,
} from './FeedbackRecordPagedResponse';






export interface FeedbackRecordPagedResponseRequestResponse {
    




    readonly response?: FeedbackRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfFeedbackRecordPagedResponseRequestResponse(value: object): value is FeedbackRecordPagedResponseRequestResponse {
    return true;
}

export function FeedbackRecordPagedResponseRequestResponseFromJSON(json: any): FeedbackRecordPagedResponseRequestResponse {
    return FeedbackRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function FeedbackRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : FeedbackRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function FeedbackRecordPagedResponseRequestResponseToJSON(json: any): FeedbackRecordPagedResponseRequestResponse {
    return FeedbackRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function FeedbackRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<FeedbackRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}
















import { mapValues } from '../runtime';
import type { MerchRecord } from './MerchRecord';
import {
    MerchRecordFromJSON,
    MerchRecordFromJSONTyped,
    MerchRecordToJSON,
    MerchRecordToJSONTyped,
} from './MerchRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface MerchRecordRequestResponse {
    




    readonly response?: MerchRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfMerchRecordRequestResponse(value: object): value is MerchRecordRequestResponse {
    return true;
}

export function MerchRecordRequestResponseFromJSON(json: any): MerchRecordRequestResponse {
    return MerchRecordRequestResponseFromJSONTyped(json, false);
}

export function MerchRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerchRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : MerchRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function MerchRecordRequestResponseToJSON(json: any): MerchRecordRequestResponse {
    return MerchRecordRequestResponseToJSONTyped(json, false);
}

export function MerchRecordRequestResponseToJSONTyped(value?: Omit<MerchRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}


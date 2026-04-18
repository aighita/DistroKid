













import { mapValues } from '../runtime';





export interface FeedbackAddRecord {
    




    type: string;
    




    rating: number;
    




    isAnonymous: boolean;
    




    comment: string;
}




export function instanceOfFeedbackAddRecord(value: object): value is FeedbackAddRecord {
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('rating' in value) || value['rating'] === undefined) return false;
    if (!('isAnonymous' in value) || value['isAnonymous'] === undefined) return false;
    if (!('comment' in value) || value['comment'] === undefined) return false;
    return true;
}

export function FeedbackAddRecordFromJSON(json: any): FeedbackAddRecord {
    return FeedbackAddRecordFromJSONTyped(json, false);
}

export function FeedbackAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'],
        'rating': json['rating'],
        'isAnonymous': json['isAnonymous'],
        'comment': json['comment'],
    };
}

export function FeedbackAddRecordToJSON(json: any): FeedbackAddRecord {
    return FeedbackAddRecordToJSONTyped(json, false);
}

export function FeedbackAddRecordToJSONTyped(value?: FeedbackAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'rating': value['rating'],
        'isAnonymous': value['isAnonymous'],
        'comment': value['comment'],
    };
}


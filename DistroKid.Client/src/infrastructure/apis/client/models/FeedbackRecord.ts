













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';






export interface FeedbackRecord {
    




    id: string;
    




    type: string;
    




    rating: number;
    




    isAnonymous: boolean;
    




    comment: string;
    




    user?: UserRecord | null;
}




export function instanceOfFeedbackRecord(value: object): value is FeedbackRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('rating' in value) || value['rating'] === undefined) return false;
    if (!('isAnonymous' in value) || value['isAnonymous'] === undefined) return false;
    if (!('comment' in value) || value['comment'] === undefined) return false;
    return true;
}

export function FeedbackRecordFromJSON(json: any): FeedbackRecord {
    return FeedbackRecordFromJSONTyped(json, false);
}

export function FeedbackRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'type': json['type'],
        'rating': json['rating'],
        'isAnonymous': json['isAnonymous'],
        'comment': json['comment'],
        'user': json['user'] == null ? undefined : UserRecordFromJSON(json['user']),
    };
}

export function FeedbackRecordToJSON(json: any): FeedbackRecord {
    return FeedbackRecordToJSONTyped(json, false);
}

export function FeedbackRecordToJSONTyped(value?: FeedbackRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'type': value['type'],
        'rating': value['rating'],
        'isAnonymous': value['isAnonymous'],
        'comment': value['comment'],
        'user': UserRecordToJSON(value['user']),
    };
}


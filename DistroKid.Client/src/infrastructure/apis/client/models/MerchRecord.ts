













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordToJSON,
} from './UserRecord';





export interface MerchRecord {
    




    id: string;
    




    name: string;
    




    description: string;
    




    price: number;
    




    stock: number;
    




    artistId: string;
    




    artist?: UserRecord | null;
}




export function instanceOfMerchRecord(value: object): value is MerchRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('price' in value) || value['price'] === undefined) return false;
    if (!('stock' in value) || value['stock'] === undefined) return false;
    if (!('artistId' in value) || value['artistId'] === undefined) return false;
    return true;
}

export function MerchRecordFromJSON(json: any): MerchRecord {
    return MerchRecordFromJSONTyped(json, false);
}

export function MerchRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerchRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': json['description'],
        'price': json['price'],
        'stock': json['stock'],
        'artistId': json['artistId'],
        'artist': json['artist'] == null ? undefined : UserRecordFromJSON(json['artist']),
    };
}

export function MerchRecordToJSON(json: any): MerchRecord {
    return MerchRecordToJSONTyped(json, false);
}

export function MerchRecordToJSONTyped(value?: MerchRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'description': value['description'],
        'price': value['price'],
        'stock': value['stock'],
        'artistId': value['artistId'],
        'artist': value['artist'] == null ? value['artist'] : UserRecordToJSON(value['artist']),
    };
}


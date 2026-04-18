














import * as runtime from '../runtime';
import type {
  RequestResponse,
  TrackAddRecord,
  TrackRecordPagedResponseRequestResponse,
  TrackRecordRequestResponse,
  TrackUpdateRecord,
} from '../models/index';
import {
    RequestResponseFromJSON,
    RequestResponseToJSON,
    TrackAddRecordFromJSON,
    TrackAddRecordToJSON,
    TrackRecordPagedResponseRequestResponseFromJSON,
    TrackRecordPagedResponseRequestResponseToJSON,
    TrackRecordRequestResponseFromJSON,
    TrackRecordRequestResponseToJSON,
    TrackUpdateRecordFromJSON,
    TrackUpdateRecordToJSON,
} from '../models/index';

export interface ApiTrackAddPostRequest {
    trackAddRecord?: TrackAddRecord;
}

export interface ApiTrackDeleteIdDeleteRequest {
    id: string;
}

export interface ApiTrackGetByIdIdGetRequest {
    id: string;
}

export interface ApiTrackGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiTrackUpdateIdPutRequest {
    id: string;
    trackUpdateRecord?: TrackUpdateRecord;
}




export class TrackApi extends runtime.BaseAPI {

    


    async apiTrackAddPostRequestOpts(requestParameters: ApiTrackAddPostRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/Track/Add`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TrackAddRecordToJSON(requestParameters['trackAddRecord']),
        };
    }

    async apiTrackAddPostRaw(requestParameters: ApiTrackAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiTrackAddPostRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiTrackAddPost(requestParameters: ApiTrackAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTrackAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiTrackDeleteIdDeleteRequestOpts(requestParameters: ApiTrackDeleteIdDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiTrackDeleteIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/Track/Delete/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiTrackDeleteIdDeleteRaw(requestParameters: ApiTrackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiTrackDeleteIdDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiTrackDeleteIdDelete(requestParameters: ApiTrackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTrackDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiTrackGetByIdIdGetRequestOpts(requestParameters: ApiTrackGetByIdIdGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiTrackGetByIdIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/Track/GetById/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiTrackGetByIdIdGetRaw(requestParameters: ApiTrackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackRecordRequestResponse>> {
        const requestOptions = await this.apiTrackGetByIdIdGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackRecordRequestResponseFromJSON(jsonValue));
    }

    async apiTrackGetByIdIdGet(requestParameters: ApiTrackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackRecordRequestResponse> {
        const response = await this.apiTrackGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiTrackGetPageGetRequestOpts(requestParameters: ApiTrackGetPageGetRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['search'] != null) {
            queryParameters['Search'] = requestParameters['search'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['Page'] = requestParameters['page'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/Track/GetPage`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiTrackGetPageGetRaw(requestParameters: ApiTrackGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TrackRecordPagedResponseRequestResponse>> {
        const requestOptions = await this.apiTrackGetPageGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackRecordPagedResponseRequestResponseFromJSON(jsonValue));
    }

    async apiTrackGetPageGet(requestParameters: ApiTrackGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TrackRecordPagedResponseRequestResponse> {
        const response = await this.apiTrackGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiTrackUpdateIdPutRequestOpts(requestParameters: ApiTrackUpdateIdPutRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiTrackUpdateIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/Track/Update/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TrackUpdateRecordToJSON(requestParameters['trackUpdateRecord']),
        };
    }

    async apiTrackUpdateIdPutRaw(requestParameters: ApiTrackUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiTrackUpdateIdPutRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiTrackUpdateIdPut(requestParameters: ApiTrackUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiTrackUpdateIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

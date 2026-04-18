














import * as runtime from '../runtime';
import type {
  EventAddRecord,
  EventRecordPagedResponseRequestResponse,
  EventRecordRequestResponse,
  EventUpdateRecord,
  RequestResponse,
} from '../models/index';
import {
    EventAddRecordFromJSON,
    EventAddRecordToJSON,
    EventRecordPagedResponseRequestResponseFromJSON,
    EventRecordPagedResponseRequestResponseToJSON,
    EventRecordRequestResponseFromJSON,
    EventRecordRequestResponseToJSON,
    EventUpdateRecordFromJSON,
    EventUpdateRecordToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models/index';

export interface ApiEventAddPostRequest {
    eventAddRecord?: EventAddRecord;
}

export interface ApiEventDeleteIdDeleteRequest {
    id: string;
}

export interface ApiEventGetByIdIdGetRequest {
    id: string;
}

export interface ApiEventGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiEventUpdateIdPutRequest {
    id: string;
    eventUpdateRecord?: EventUpdateRecord;
}




export class EventApi extends runtime.BaseAPI {

    


    async apiEventAddPostRequestOpts(requestParameters: ApiEventAddPostRequest): Promise<runtime.RequestOpts> {
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

        let urlPath = `/api/Event/Add`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EventAddRecordToJSON(requestParameters['eventAddRecord']),
        };
    }

    async apiEventAddPostRaw(requestParameters: ApiEventAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiEventAddPostRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiEventAddPost(requestParameters: ApiEventAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiEventAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiEventDeleteIdDeleteRequestOpts(requestParameters: ApiEventDeleteIdDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiEventDeleteIdDelete().'
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

        let urlPath = `/api/Event/Delete/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiEventDeleteIdDeleteRaw(requestParameters: ApiEventDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiEventDeleteIdDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiEventDeleteIdDelete(requestParameters: ApiEventDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiEventDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiEventGetByIdIdGetRequestOpts(requestParameters: ApiEventGetByIdIdGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiEventGetByIdIdGet().'
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

        let urlPath = `/api/Event/GetById/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiEventGetByIdIdGetRaw(requestParameters: ApiEventGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventRecordRequestResponse>> {
        const requestOptions = await this.apiEventGetByIdIdGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventRecordRequestResponseFromJSON(jsonValue));
    }

    async apiEventGetByIdIdGet(requestParameters: ApiEventGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventRecordRequestResponse> {
        const response = await this.apiEventGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiEventGetPageGetRequestOpts(requestParameters: ApiEventGetPageGetRequest): Promise<runtime.RequestOpts> {
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

        let urlPath = `/api/Event/GetPage`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiEventGetPageGetRaw(requestParameters: ApiEventGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EventRecordPagedResponseRequestResponse>> {
        const requestOptions = await this.apiEventGetPageGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventRecordPagedResponseRequestResponseFromJSON(jsonValue));
    }

    async apiEventGetPageGet(requestParameters: ApiEventGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EventRecordPagedResponseRequestResponse> {
        const response = await this.apiEventGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiEventUpdateIdPutRequestOpts(requestParameters: ApiEventUpdateIdPutRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiEventUpdateIdPut().'
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

        let urlPath = `/api/Event/Update/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: EventUpdateRecordToJSON(requestParameters['eventUpdateRecord']),
        };
    }

    async apiEventUpdateIdPutRaw(requestParameters: ApiEventUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiEventUpdateIdPutRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiEventUpdateIdPut(requestParameters: ApiEventUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiEventUpdateIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

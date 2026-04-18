














import * as runtime from '../runtime';
import type {
  MerchAddRecord,
  MerchRecordPagedResponseRequestResponse,
  MerchRecordRequestResponse,
  MerchUpdateRecord,
  RequestResponse,
} from '../models/index';
import {
    MerchAddRecordFromJSON,
    MerchAddRecordToJSON,
    MerchRecordPagedResponseRequestResponseFromJSON,
    MerchRecordPagedResponseRequestResponseToJSON,
    MerchRecordRequestResponseFromJSON,
    MerchRecordRequestResponseToJSON,
    MerchUpdateRecordFromJSON,
    MerchUpdateRecordToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models/index';

export interface ApiMerchAddPostRequest {
    merchAddRecord?: MerchAddRecord;
}

export interface ApiMerchDeleteIdDeleteRequest {
    id: string;
}

export interface ApiMerchGetByIdIdGetRequest {
    id: string;
}

export interface ApiMerchGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiMerchUpdateIdPutRequest {
    id: string;
    merchUpdateRecord?: MerchUpdateRecord;
}




export class MerchApi extends runtime.BaseAPI {

    


    async apiMerchAddPostRequestOpts(requestParameters: ApiMerchAddPostRequest): Promise<runtime.RequestOpts> {
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

        let urlPath = `/api/Merch/Add`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MerchAddRecordToJSON(requestParameters['merchAddRecord']),
        };
    }

    async apiMerchAddPostRaw(requestParameters: ApiMerchAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiMerchAddPostRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiMerchAddPost(requestParameters: ApiMerchAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMerchAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiMerchDeleteIdDeleteRequestOpts(requestParameters: ApiMerchDeleteIdDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiMerchDeleteIdDelete().'
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

        let urlPath = `/api/Merch/Delete/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiMerchDeleteIdDeleteRaw(requestParameters: ApiMerchDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiMerchDeleteIdDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiMerchDeleteIdDelete(requestParameters: ApiMerchDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMerchDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiMerchGetByIdIdGetRequestOpts(requestParameters: ApiMerchGetByIdIdGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiMerchGetByIdIdGet().'
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

        let urlPath = `/api/Merch/GetById/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiMerchGetByIdIdGetRaw(requestParameters: ApiMerchGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerchRecordRequestResponse>> {
        const requestOptions = await this.apiMerchGetByIdIdGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerchRecordRequestResponseFromJSON(jsonValue));
    }

    async apiMerchGetByIdIdGet(requestParameters: ApiMerchGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerchRecordRequestResponse> {
        const response = await this.apiMerchGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiMerchGetPageGetRequestOpts(requestParameters: ApiMerchGetPageGetRequest): Promise<runtime.RequestOpts> {
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

        let urlPath = `/api/Merch/GetPage`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiMerchGetPageGetRaw(requestParameters: ApiMerchGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerchRecordPagedResponseRequestResponse>> {
        const requestOptions = await this.apiMerchGetPageGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerchRecordPagedResponseRequestResponseFromJSON(jsonValue));
    }

    async apiMerchGetPageGet(requestParameters: ApiMerchGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerchRecordPagedResponseRequestResponse> {
        const response = await this.apiMerchGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiMerchUpdateIdPutRequestOpts(requestParameters: ApiMerchUpdateIdPutRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiMerchUpdateIdPut().'
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

        let urlPath = `/api/Merch/Update/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: MerchUpdateRecordToJSON(requestParameters['merchUpdateRecord']),
        };
    }

    async apiMerchUpdateIdPutRaw(requestParameters: ApiMerchUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiMerchUpdateIdPutRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiMerchUpdateIdPut(requestParameters: ApiMerchUpdateIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiMerchUpdateIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

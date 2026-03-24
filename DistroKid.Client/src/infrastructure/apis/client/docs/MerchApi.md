# MerchApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiMerchAddPost**](MerchApi.md#apimerchaddpost) | **POST** /api/Merch/Add |  |
| [**apiMerchDeleteIdDelete**](MerchApi.md#apimerchdeleteiddelete) | **DELETE** /api/Merch/Delete/{id} |  |
| [**apiMerchGetByIdIdGet**](MerchApi.md#apimerchgetbyididget) | **GET** /api/Merch/GetById/{id} |  |
| [**apiMerchGetPageGet**](MerchApi.md#apimerchgetpageget) | **GET** /api/Merch/GetPage |  |
| [**apiMerchUpdateIdPut**](MerchApi.md#apimerchupdateidput) | **PUT** /api/Merch/Update/{id} |  |



## apiMerchAddPost

> RequestResponse apiMerchAddPost(merchAddRecord)



### Example

```ts
import {
  Configuration,
  MerchApi,
} from '';
import type { ApiMerchAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MerchApi(config);

  const body = {
    // MerchAddRecord (optional)
    merchAddRecord: ...,
  } satisfies ApiMerchAddPostRequest;

  try {
    const data = await api.apiMerchAddPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **merchAddRecord** | [MerchAddRecord](MerchAddRecord.md) |  | [Optional] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMerchDeleteIdDelete

> RequestResponse apiMerchDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  MerchApi,
} from '';
import type { ApiMerchDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MerchApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiMerchDeleteIdDeleteRequest;

  try {
    const data = await api.apiMerchDeleteIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMerchGetByIdIdGet

> MerchRecordRequestResponse apiMerchGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  MerchApi,
} from '';
import type { ApiMerchGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MerchApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiMerchGetByIdIdGetRequest;

  try {
    const data = await api.apiMerchGetByIdIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**MerchRecordRequestResponse**](MerchRecordRequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMerchGetPageGet

> MerchRecordPagedResponseRequestResponse apiMerchGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  MerchApi,
} from '';
import type { ApiMerchGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MerchApi(config);

  const body = {
    // string (optional)
    search: search_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
  } satisfies ApiMerchGetPageGetRequest;

  try {
    const data = await api.apiMerchGetPageGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**MerchRecordPagedResponseRequestResponse**](MerchRecordPagedResponseRequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMerchUpdateIdPut

> RequestResponse apiMerchUpdateIdPut(id, merchUpdateRecord)



### Example

```ts
import {
  Configuration,
  MerchApi,
} from '';
import type { ApiMerchUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MerchApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // MerchUpdateRecord (optional)
    merchUpdateRecord: ...,
  } satisfies ApiMerchUpdateIdPutRequest;

  try {
    const data = await api.apiMerchUpdateIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **merchUpdateRecord** | [MerchUpdateRecord](MerchUpdateRecord.md) |  | [Optional] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


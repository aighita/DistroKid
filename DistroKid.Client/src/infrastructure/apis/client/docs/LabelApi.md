# LabelApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiLabelAddPost**](LabelApi.md#apilabeladdpost) | **POST** /api/Label/Add |  |
| [**apiLabelDeleteIdDelete**](LabelApi.md#apilabeldeleteiddelete) | **DELETE** /api/Label/Delete/{id} |  |
| [**apiLabelGetByIdIdGet**](LabelApi.md#apilabelgetbyididget) | **GET** /api/Label/GetById/{id} |  |
| [**apiLabelGetPageGet**](LabelApi.md#apilabelgetpageget) | **GET** /api/Label/GetPage |  |
| [**apiLabelUpdateIdPut**](LabelApi.md#apilabelupdateidput) | **PUT** /api/Label/Update/{id} |  |



## apiLabelAddPost

> RequestResponse apiLabelAddPost(labelAddRecord)



### Example

```ts
import {
  Configuration,
  LabelApi,
} from '';
import type { ApiLabelAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LabelApi(config);

  const body = {
    // LabelAddRecord (optional)
    labelAddRecord: ...,
  } satisfies ApiLabelAddPostRequest;

  try {
    const data = await api.apiLabelAddPost(body);
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
| **labelAddRecord** | [LabelAddRecord](LabelAddRecord.md) |  | [Optional] |

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


## apiLabelDeleteIdDelete

> RequestResponse apiLabelDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  LabelApi,
} from '';
import type { ApiLabelDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LabelApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiLabelDeleteIdDeleteRequest;

  try {
    const data = await api.apiLabelDeleteIdDelete(body);
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


## apiLabelGetByIdIdGet

> LabelRecordRequestResponse apiLabelGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  LabelApi,
} from '';
import type { ApiLabelGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LabelApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiLabelGetByIdIdGetRequest;

  try {
    const data = await api.apiLabelGetByIdIdGet(body);
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

[**LabelRecordRequestResponse**](LabelRecordRequestResponse.md)

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


## apiLabelGetPageGet

> LabelRecordPagedResponseRequestResponse apiLabelGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  LabelApi,
} from '';
import type { ApiLabelGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LabelApi(config);

  const body = {
    // string (optional)
    search: search_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
  } satisfies ApiLabelGetPageGetRequest;

  try {
    const data = await api.apiLabelGetPageGet(body);
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

[**LabelRecordPagedResponseRequestResponse**](LabelRecordPagedResponseRequestResponse.md)

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


## apiLabelUpdateIdPut

> RequestResponse apiLabelUpdateIdPut(id, labelUpdateRecord)



### Example

```ts
import {
  Configuration,
  LabelApi,
} from '';
import type { ApiLabelUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LabelApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // LabelUpdateRecord (optional)
    labelUpdateRecord: ...,
  } satisfies ApiLabelUpdateIdPutRequest;

  try {
    const data = await api.apiLabelUpdateIdPut(body);
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
| **labelUpdateRecord** | [LabelUpdateRecord](LabelUpdateRecord.md) |  | [Optional] |

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


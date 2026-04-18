# EventApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiEventAddPost**](EventApi.md#apieventaddpost) | **POST** /api/Event/Add |  |
| [**apiEventDeleteIdDelete**](EventApi.md#apieventdeleteiddelete) | **DELETE** /api/Event/Delete/{id} |  |
| [**apiEventGetByIdIdGet**](EventApi.md#apieventgetbyididget) | **GET** /api/Event/GetById/{id} |  |
| [**apiEventGetPageGet**](EventApi.md#apieventgetpageget) | **GET** /api/Event/GetPage |  |
| [**apiEventUpdateIdPut**](EventApi.md#apieventupdateidput) | **PUT** /api/Event/Update/{id} |  |



## apiEventAddPost

> RequestResponse apiEventAddPost(eventAddRecord)



### Example

```ts
import {
  Configuration,
  EventApi,
} from '';
import type { ApiEventAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EventApi(config);

  const body = {
    eventAddRecord: ...,
  } satisfies ApiEventAddPostRequest;

  try {
    const data = await api.apiEventAddPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventAddRecord** | [EventAddRecord](EventAddRecord.md) |  | [Optional] |

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


## apiEventDeleteIdDelete

> RequestResponse apiEventDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  EventApi,
} from '';
import type { ApiEventDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EventApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiEventDeleteIdDeleteRequest;

  try {
    const data = await api.apiEventDeleteIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
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


## apiEventGetByIdIdGet

> EventRecordRequestResponse apiEventGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  EventApi,
} from '';
import type { ApiEventGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EventApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiEventGetByIdIdGetRequest;

  try {
    const data = await api.apiEventGetByIdIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**EventRecordRequestResponse**](EventRecordRequestResponse.md)

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


## apiEventGetPageGet

> EventRecordPagedResponseRequestResponse apiEventGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  EventApi,
} from '';
import type { ApiEventGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EventApi(config);

  const body = {
    search: search_example,
    page: 56,
    pageSize: 56,
  } satisfies ApiEventGetPageGetRequest;

  try {
    const data = await api.apiEventGetPageGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**EventRecordPagedResponseRequestResponse**](EventRecordPagedResponseRequestResponse.md)

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


## apiEventUpdateIdPut

> RequestResponse apiEventUpdateIdPut(id, eventUpdateRecord)



### Example

```ts
import {
  Configuration,
  EventApi,
} from '';
import type { ApiEventUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EventApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    eventUpdateRecord: ...,
  } satisfies ApiEventUpdateIdPutRequest;

  try {
    const data = await api.apiEventUpdateIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **eventUpdateRecord** | [EventUpdateRecord](EventUpdateRecord.md) |  | [Optional] |

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


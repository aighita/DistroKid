# TrackApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiTrackAddPost**](TrackApi.md#apitrackaddpost) | **POST** /api/Track/Add |  |
| [**apiTrackDeleteIdDelete**](TrackApi.md#apitrackdeleteiddelete) | **DELETE** /api/Track/Delete/{id} |  |
| [**apiTrackGetByIdIdGet**](TrackApi.md#apitrackgetbyididget) | **GET** /api/Track/GetById/{id} |  |
| [**apiTrackGetPageGet**](TrackApi.md#apitrackgetpageget) | **GET** /api/Track/GetPage |  |
| [**apiTrackUpdateIdPut**](TrackApi.md#apitrackupdateidput) | **PUT** /api/Track/Update/{id} |  |



## apiTrackAddPost

> RequestResponse apiTrackAddPost(trackAddRecord)



### Example

```ts
import {
  Configuration,
  TrackApi,
} from '';
import type { ApiTrackAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TrackApi(config);

  const body = {
    // TrackAddRecord (optional)
    trackAddRecord: ...,
  } satisfies ApiTrackAddPostRequest;

  try {
    const data = await api.apiTrackAddPost(body);
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
| **trackAddRecord** | [TrackAddRecord](TrackAddRecord.md) |  | [Optional] |

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


## apiTrackDeleteIdDelete

> RequestResponse apiTrackDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  TrackApi,
} from '';
import type { ApiTrackDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TrackApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiTrackDeleteIdDeleteRequest;

  try {
    const data = await api.apiTrackDeleteIdDelete(body);
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


## apiTrackGetByIdIdGet

> TrackRecordRequestResponse apiTrackGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  TrackApi,
} from '';
import type { ApiTrackGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TrackApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiTrackGetByIdIdGetRequest;

  try {
    const data = await api.apiTrackGetByIdIdGet(body);
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

[**TrackRecordRequestResponse**](TrackRecordRequestResponse.md)

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


## apiTrackGetPageGet

> TrackRecordPagedResponseRequestResponse apiTrackGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  TrackApi,
} from '';
import type { ApiTrackGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TrackApi(config);

  const body = {
    // string (optional)
    search: search_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
  } satisfies ApiTrackGetPageGetRequest;

  try {
    const data = await api.apiTrackGetPageGet(body);
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

[**TrackRecordPagedResponseRequestResponse**](TrackRecordPagedResponseRequestResponse.md)

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


## apiTrackUpdateIdPut

> RequestResponse apiTrackUpdateIdPut(id, trackUpdateRecord)



### Example

```ts
import {
  Configuration,
  TrackApi,
} from '';
import type { ApiTrackUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TrackApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // TrackUpdateRecord (optional)
    trackUpdateRecord: ...,
  } satisfies ApiTrackUpdateIdPutRequest;

  try {
    const data = await api.apiTrackUpdateIdPut(body);
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
| **trackUpdateRecord** | [TrackUpdateRecord](TrackUpdateRecord.md) |  | [Optional] |

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


# FeedbackApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiFeedbackAddPost**](FeedbackApi.md#apifeedbackaddpost) | **POST** /api/Feedback/Add |  |



## apiFeedbackAddPost

> RequestResponse apiFeedbackAddPost(feedbackAddRecord)



### Example

```ts
import {
  Configuration,
  FeedbackApi,
} from '';
import type { ApiFeedbackAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FeedbackApi(config);

  const body = {
    // FeedbackAddRecord (optional)
    feedbackAddRecord: ...,
  } satisfies ApiFeedbackAddPostRequest;

  try {
    const data = await api.apiFeedbackAddPost(body);
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
| **feedbackAddRecord** | [FeedbackAddRecord](FeedbackAddRecord.md) |  | [Optional] |

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


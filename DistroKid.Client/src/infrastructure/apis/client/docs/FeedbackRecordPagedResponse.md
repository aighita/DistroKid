
# FeedbackRecordPagedResponse


## Properties

Name | Type
------------ | -------------
`page` | number
`pageSize` | number
`totalCount` | number
`data` | [Array&lt;FeedbackRecord&gt;](FeedbackRecord.md)

## Example

```typescript
import type { FeedbackRecordPagedResponse } from ''
const example = {
  "page": null,
  "pageSize": null,
  "totalCount": null,
  "data": null,
} satisfies FeedbackRecordPagedResponse

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as FeedbackRecordPagedResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



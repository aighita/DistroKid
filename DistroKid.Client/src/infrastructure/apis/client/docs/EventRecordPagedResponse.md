
# EventRecordPagedResponse


## Properties

Name | Type
------------ | -------------
`page` | number
`pageSize` | number
`totalCount` | number
`data` | [Array&lt;EventRecord&gt;](EventRecord.md)

## Example

```typescript
import type { EventRecordPagedResponse } from ''
const example = {
  "page": null,
  "pageSize": null,
  "totalCount": null,
  "data": null,
} satisfies EventRecordPagedResponse

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as EventRecordPagedResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



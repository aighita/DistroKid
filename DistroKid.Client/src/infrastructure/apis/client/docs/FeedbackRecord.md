
# FeedbackRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`rating` | number
`isAnonymous` | boolean
`comment` | string
`user` | [UserRecord](UserRecord.md)

## Example

```typescript
import type { FeedbackRecord } from ''
const example = {
  "id": null,
  "type": null,
  "rating": null,
  "isAnonymous": null,
  "comment": null,
  "user": null,
} satisfies FeedbackRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as FeedbackRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



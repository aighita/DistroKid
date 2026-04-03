
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

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "rating": null,
  "isAnonymous": null,
  "comment": null,
  "user": null,
} satisfies FeedbackRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedbackRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



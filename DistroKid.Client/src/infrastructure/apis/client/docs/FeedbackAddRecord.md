
# FeedbackAddRecord


## Properties

Name | Type
------------ | -------------
`type` | string
`rating` | number
`isAnonymous` | boolean
`comment` | string

## Example

```typescript
import type { FeedbackAddRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "rating": null,
  "isAnonymous": null,
  "comment": null,
} satisfies FeedbackAddRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedbackAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



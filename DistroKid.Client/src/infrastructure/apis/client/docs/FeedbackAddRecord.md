
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
const example = {
  "type": null,
  "rating": null,
  "isAnonymous": null,
  "comment": null,
} satisfies FeedbackAddRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as FeedbackAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# TrackAddRecord


## Properties

Name | Type
------------ | -------------
`title` | string
`durationInSeconds` | number
`isrc` | string
`artistId` | string

## Example

```typescript
import type { TrackAddRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "durationInSeconds": null,
  "isrc": null,
  "artistId": null,
} satisfies TrackAddRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TrackAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# TrackUpdateRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`durationInSeconds` | number
`isrc` | string
`artistId` | string

## Example

```typescript
import type { TrackUpdateRecord } from ''
const example = {
  "id": null,
  "title": null,
  "durationInSeconds": null,
  "isrc": null,
  "artistId": null,
} satisfies TrackUpdateRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as TrackUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



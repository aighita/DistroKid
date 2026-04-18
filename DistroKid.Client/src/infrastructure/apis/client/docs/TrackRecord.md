
# TrackRecord


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
import type { TrackRecord } from ''
const example = {
  "id": null,
  "title": null,
  "durationInSeconds": null,
  "isrc": null,
  "artistId": null,
} satisfies TrackRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as TrackRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



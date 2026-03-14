
# ReleaseRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`releaseDate` | Date
`label` | string
`releaseType` | [ReleaseTypeEnum](ReleaseTypeEnum.md)
`tracks` | [Array&lt;TrackRecord&gt;](TrackRecord.md)
`platforms` | [Array&lt;PlatformRecord&gt;](PlatformRecord.md)

## Example

```typescript
import type { ReleaseRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "releaseDate": null,
  "label": null,
  "releaseType": null,
  "tracks": null,
  "platforms": null,
} satisfies ReleaseRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReleaseRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



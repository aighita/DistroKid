
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
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as ReleaseRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



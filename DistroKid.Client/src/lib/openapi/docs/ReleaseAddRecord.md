
# ReleaseAddRecord


## Properties

Name | Type
------------ | -------------
`title` | string
`label` | string
`tracks` | [Array&lt;TrackRecord&gt;](TrackRecord.md)
`platforms` | [Array&lt;PlatformRecord&gt;](PlatformRecord.md)

## Example

```typescript
import type { ReleaseAddRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "label": null,
  "tracks": null,
  "platforms": null,
} satisfies ReleaseAddRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReleaseAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



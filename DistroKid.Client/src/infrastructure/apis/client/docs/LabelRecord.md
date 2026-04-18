
# LabelRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`website` | string
`releases` | [Array&lt;ReleaseRecord&gt;](ReleaseRecord.md)
`artists` | [Array&lt;UserRecord&gt;](UserRecord.md)
`managers` | [Array&lt;UserRecord&gt;](UserRecord.md)

## Example

```typescript
import type { LabelRecord } from ''
const example = {
  "id": null,
  "name": null,
  "website": null,
  "releases": null,
  "artists": null,
  "managers": null,
} satisfies LabelRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as LabelRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



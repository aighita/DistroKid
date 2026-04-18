
# ReleaseUpdateRecord


## Properties

Name | Type
------------ | -------------
`title` | string
`label` | string
`releaseType` | [ReleaseTypeEnum](ReleaseTypeEnum.md)
`releaseDate` | Date
`trackIds` | Array&lt;string&gt;
`platformIds` | Array&lt;string&gt;

## Example

```typescript
import type { ReleaseUpdateRecord } from ''
const example = {
  "title": null,
  "label": null,
  "releaseType": null,
  "releaseDate": null,
  "trackIds": null,
  "platformIds": null,
} satisfies ReleaseUpdateRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as ReleaseUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



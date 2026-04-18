
# MerchRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`price` | number
`stock` | number
`artistId` | string

## Example

```typescript
import type { MerchRecord } from ''
const example = {
  "id": null,
  "name": null,
  "description": null,
  "price": null,
  "stock": null,
  "artistId": null,
} satisfies MerchRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as MerchRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



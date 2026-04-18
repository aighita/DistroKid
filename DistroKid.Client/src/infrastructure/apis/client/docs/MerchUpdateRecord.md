
# MerchUpdateRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`price` | number
`stock` | number

## Example

```typescript
import type { MerchUpdateRecord } from ''
const example = {
  "name": null,
  "description": null,
  "price": null,
  "stock": null,
} satisfies MerchUpdateRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as MerchUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



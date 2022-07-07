import AWS from "aws-sdk"
import { formatJSONResponse } from "@libs/api-gateway";
import { parseBody } from "@utils/util";

const docClient = new AWS.DynamoDB.DocumentClient()

export const handler = async (event: any) => {

  let body = parseBody(event.body)
  console.log('dynamodb sample lambda')
  console.log(body)

  let timeStamp = new Date().getTime()

  let updateItem = {
    menuDate: '20220708',
    menuTime: '2',
    menuContent: [
      {
        'menuName': '점심A코너',
        'menuDetail': '소세지오므라이스, 미소국, 고로케*케찹, 곤약야채무침'
      },
      {
        'menuName': '점심B코너',
        'menuDetail': '닭감자조림, 현미밥/얼큰김치국, 호박채전, 고추양파초절이'
      }
    ],
    createdAt: timeStamp,
    updatedAt: timeStamp
  }

  // insert
  await docClient.put({
    TableName: 'MenuTable',
    Item: updateItem
  }, (err, data) => {
    if (err) {
      console.error(`Unable to add item. Error JSON: ${JSON.stringify(err, null, 2)}`)
    } else {
      console.log(`Added item: ${JSON.stringify(data, null, 2)}`)
    }
  }).promise()

  // select
  let item = await docClient.get({
    TableName: 'MenuTable',
    Key: {
      menuDate: '20220708',
      menuTime: body['text']
    }
  }, (err, data) => {
    if (err) {
      console.error(`Unable to read item. Error JSON: ${JSON.stringify(err, null, 2)}`)
    } else {
      console.log(`GetItem succeeded: ${JSON.stringify(data, null, 2)}`)
    }
  }).promise()

  return formatJSONResponse({
    response_type: 'in_channel',
    body: item.Item,
    event
  })
}

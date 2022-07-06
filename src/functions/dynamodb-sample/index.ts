import { utils } from "../../libs/db/utils"
import AWS from "aws-sdk"

const dynamoDB = new AWS.DynamoDB()

export const handler = async (event:any) => {

  console.log('dynamodb sample lambda')
  console.log(event)

  //skhero.kang 2022/07/06 여기서부터 insert
  let item
  let qlItem
  const timestamp = new Date().getTime()

  const menuDate = '2022-07-06'
  const menuTime = '1' //1 : 아침  2: 점심  3: 저녁
  const menuContent = [
    {
      'menuName' : '점심A코너',
      'menuDetail' : '소세지오므라이스, 미소국, 고로케*케찹, 곤약야채무침'
    },
    {
      'menuName' : '점심B코너',
      'menuDetail' : '닭감자조림, 현미밥/얼큰김치국, 호박채전, 고추양파초절이'
    }
  ]

  item = {
    "menuDate": menuDate,
    "menuTime" : menuTime, //1 : 아침  2: 점심  3: 저녁
    "menuContent" : menuContent,
    "createdAt": timestamp,
    "updatedAt": timestamp
  }

  console.log("insert item")
  console.log(item)
  qlItem = utils.stringify(item)

  try {
    const statement = `INSERT INTO ${process.env.MENU_TABLE} VALUE ${qlItem}`
    const result = await dynamoDB.executeStatement({Statement: statement}).promise();
    const convertedResult = AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
    console.log("Query results")
    console.log(convertedResult)
  }catch (e){
    console.error(e)
  }

  //skhero.kang 2022/07/06 여기서부터 select
  let convertedMenuList = []

  try {
    const statement =
      `SELECT * FROM ${process.env.MENU_TABLE}
               WHERE "menuDate" = '2022-07-06' 
               AND "menuTime" = '1' `

    const menuList = await dynamoDB.executeStatement({Statement: statement}).promise();
    console.log(statement)
    console.log("Query menuList===>")
    console.log(menuList)

    for(let i = 0; i < menuList.Items.length; i++ ){
      convertedMenuList.push(AWS.DynamoDB.Converter.unmarshall(menuList.Items[i]))
    }
    console.log("Query convertedMenuList===>")
    console.log(convertedMenuList)
  }catch (e){
    console.error(e)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(item)
  }
}

import {getDateTimeStamp, getDbDate, getDisplayDate, parseBody, toComma, wordReplace} from "./util";

test('toComma', () => {
  expect(toComma('닭곰탕\n쌀밥/잡곡밥/누룽지\n베이컨감자볶음\n도토리묵야채무침\n깍두기\n셀프토스트&커피&시리얼&우유'))
    .toBe('닭곰탕, 쌀밥/잡곡밥/누룽지, 베이컨감자볶음, 도토리묵야채무침, 깍두기, 셀프토스트&커피&시리얼&우유')
})

test('getDbDate', () => {
  expect(getDbDate(new Date('Sun May 10 2019 08:27:12 GMT+0900 (한국 표준시)')))
    .toBe('20190510')
})

test('getDisplayDate', () => {
  expect(getDisplayDate(new Date('Sun May 10 2019 08:27:12 GMT+0900 (한국 표준시)')))
    .toBe('May 10, 2019')
})

test('getDateTimeStamp', () => {
  expect(getDateTimeStamp(new Date('Sun May 10 2019 08:27:12 GMT+0900 (한국 표준시)')))
    .toBe('2019-05-10 08:27:12')
})

test('wordReplace', () => {
  expect(wordReplace('tomorrow breakfast'))
    .toStrictEqual(['breakfast', true])
})

test('parseBody', () => {
  expect(parseBody('text=1&command=/menu'))
      .toStrictEqual({
          text: '1',
          command: '/menu'
      })
})
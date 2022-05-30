import { getDbDate, getDisplayDate, toComma, wordReplace } from "./util";

test('toComma', () => {
  expect(toComma('닭곰탕\n쌀밥/잡곡밥/누룽지\n베이컨감자볶음\n도토리묵야채무침\n깍두기\n셀프토스트&커피&시리얼&우유'))
    .toBe('닭곰탕, 쌀밥/잡곡밥/누룽지, 베이컨감자볶음, 도토리묵야채무침, 깍두기, 셀프토스트&커피&시리얼&우유')
})

test('getDbDate', () => {
  expect(getDbDate(new Date('2022-05-27')))
    .toBe('20220527')
})

test('getDisplayDate', () => {
  expect(getDisplayDate(new Date('2022-05-27')))
    .toBe('May 27, 2022')
})

test('wordReplace', () => {
  expect(wordReplace('tomorrow breakfast'))
    .toStrictEqual(['breakfast', true])
})
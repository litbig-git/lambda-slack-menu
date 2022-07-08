import { crawl, extract } from './crawl'

test('extract', async () => {
  expect(extract(await crawl('617')))
    .toStrictEqual({
        attr: 'http://www.pvv.co.kr/bbs/download.php?bbsMode=fileDown&code=bbs_menu01&id=617&filename=%C6%C7%B1%B306%BF%F904%C1%D6(3).pdf',
        text: '판교06월04주(3).pdf'
      }
    )
})
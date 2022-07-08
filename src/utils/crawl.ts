import request from 'request'
import { load } from 'cheerio'
import iconv from 'iconv-lite'

const domain = 'http://www.pvv.co.kr/bbs'

export const crawl = (id: string) =>
  new Promise<string>((resolve, reject) => {
    request.get({
      url: `${domain}/bbsView.php?id=${id}&page=1&code=bbs_menu01`,
      encoding: null
    }, (err, res) => {
      if (err) reject(err)
      resolve(iconv.decode(res.body, 'euckr'))
    })
  })

export const extract = (html: string) => {
  if (html === '') return []
  const $ = load(html)
  const crawledRealtimeKeywords = $(
    'a[href^="download"][href*=".pdf"]'
  )
  return $(crawledRealtimeKeywords)
    .map(
      (_i, ele): { attr: string, text: string } => {
        return {
          attr: `${domain}/${$(ele).attr('href')}`
            .replace('판교', '%C6%C7%B1%B3')
            .replace('월', '%BF%F9')
            .replace('주', '%C1%D6'),
          text: $(ele).text()
        }
      }
    ).get()[0]
}
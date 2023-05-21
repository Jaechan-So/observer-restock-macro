import puppeteer from 'puppeteer';

import { SWAGKEYS_LINK65_URL } from '../constantData';

const sleep = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getWishProducts = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(SWAGKEYS_LINK65_URL);

  // Due to the rendering delay, we need to stay for 5 seconds roughly.
  await sleep(5000);

  await page.waitForSelector('a[aria-haspopup="listbox"]');
  await page.$eval('a[aria-haspopup="listbox"]', (elem) => elem.click());

  const wishProducts = await page.$$eval(
    'ul[role="listbox"] > li[role="presentation"] > a',
    (elems) => {
      const WISH_TOP_CASE_COLOR = ['Silver', 'Starlight'];
      const SOLD_OUT_TOKEN = '품절';

      const list: string[] = [];
      elems.forEach((elem) => {
        const topCaseColor = elem.childNodes.item(0).nodeValue;
        let isSoldOut = false;
        elem.childNodes.forEach((node) => {
          const token = node.nodeValue;
          if (!!token && token.includes(SOLD_OUT_TOKEN)) {
            isSoldOut = true;
          }
        });

        const isWishLink65Available =
          !!topCaseColor &&
          WISH_TOP_CASE_COLOR.some((candidate) =>
            topCaseColor.trim().includes(candidate),
          ) &&
          !isSoldOut;
        if (isWishLink65Available) {
          let caseColor = '';
          elem.childNodes.forEach((node) => {
            const token = node.nodeValue;
            if (token && !token.includes(SOLD_OUT_TOKEN)) {
              caseColor = `${caseColor}${token}`;
            }
          });
          list.push(caseColor);
        }
      });
      return list;
    },
  );

  await browser.close();

  return wishProducts;
};

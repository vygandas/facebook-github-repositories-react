import { parse } from 'querystring';

export const parseHeadersForPagesCount = headers => {
  if (
    typeof headers !== typeof undefined &&
    typeof headers['link'] !== typeof undefined
  ) {
    try {
      const linkParts = String(headers['link'])
        .replace(' ', '')
        .split(',');
      const lastLink = linkParts.filter(p => p.search('rel="last"'))[0];
      const link = lastLink.substring(
        lastLink.indexOf('<') + 1,
        lastLink.indexOf('>')
      );
      const queryParams = link.split('?')[1];
      const parsedParams = parse(queryParams);
      return parsedParams.page;
    } catch (error) {
      return 1;
    }
  }
};

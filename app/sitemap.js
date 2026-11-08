import {PAGES,SITE_URL,INDEXABLE} from '@/lib/seo';
export default function sitemap(){
  return INDEXABLE
    ? Object.keys(PAGES).filter(route => route !== '/preventivo').map(route => ({url: SITE_URL + route}))
    : [];
}

import {PAGES,SITE_URL,INDEXABLE} from '@/lib/seo';
export default function sitemap(){return INDEXABLE?Object.keys(PAGES).map(route=>({url:SITE_URL+route})):[];}

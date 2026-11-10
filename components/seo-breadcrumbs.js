import { SITE_URL, PAGES } from '@/lib/seo';
export default function SeoBreadcrumbs({route}) {
 const data={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:PAGES[route][0].split(' | ')[0],item:SITE_URL+route}]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}

import { notFound } from 'next/navigation';
import CatalogDemo from '@/components/catalog-demo';
import { makitoDemoEnabled } from '@/lib/makito-demo';
import './catalogo.css';
export const dynamic = 'force-dynamic';
export const metadata = {title:'Catalogo aziendale — Demo RAIA',robots:{index:false,follow:false}};
export default function CatalogPage(){
 if(!makitoDemoEnabled()) notFound();
 return <CatalogDemo/>;
}

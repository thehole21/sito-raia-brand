import {NextResponse} from 'next/server';
const legacy={'415':'/','427':'/chi-siamo','430':'/servizi','438':'/contatti','989':'/progetti','1286':'/privacy'};
export function middleware(request){const url=request.nextUrl.clone();const id=url.searchParams.get('p')||url.searchParams.get('page_id');if(id&&legacy[id]){url.pathname=legacy[id];url.searchParams.delete('p');url.searchParams.delete('page_id');return NextResponse.redirect(url,308);}return NextResponse.next();}
export const config={matcher:'/'};

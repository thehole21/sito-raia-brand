'use client';
import {useState} from 'react';
export default function LocationMap({src}){const [active,setActive]=useState(false);return active?<iframe src={src} title="Mappa della sede RAIA a Guidonia Montecelio" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>:<button type="button" className="map-activate" onClick={()=>setActive(true)}><strong>RAIA · Guidonia Montecelio</strong><span>Via Bruno Pontecorvo 46</span><span>Mostra la mappa interattiva</span></button>;}

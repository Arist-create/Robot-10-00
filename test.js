const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();

let zapros =  await tv.getTicker('FWB:TL0')
                        const tickerbid = zapros.bid
                        console.log( tickerbid )
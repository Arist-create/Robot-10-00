const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
const accountId = '2144725658'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();


let zapros =  await tv.getTicker(`${long[0].EX}:${long[0].WORLD}`)
                        const tickerbid = zapros.bid
                        const tradable = zapros.is_tradable
                        console.log(zapros)

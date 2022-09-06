const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();

var date = new Date()
        var date1 = date.toLocaleTimeString("sv-SE",{timeZone: "Europe/Moscow"})
        var day = date.getDay()
        var j = 0
        if (date1.slice(0,2) == 3) {
            j+=1
        }
        console.log(j)
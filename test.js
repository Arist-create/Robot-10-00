const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
const accountId = '2144725658'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();
const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                                var time = (Math.round(new Date().getTime()/1000.0)) + 180
                                request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`, async function(error, response, body){
                                    
                                        const data2 = JSON.parse(body)   
                                        const JWT = data2.AccessToken
await fetch('https://api.alor.ru/warptrans/ITRADE/v2/client/orders/actions/takeProfitLimit',{
                
                                    method: 'POST',
                                    body: JSON.stringify({
                                        
                                        "side": "sell",
                                        "condition": "More",
                                        "triggerPrice": 300,
                                        "stopEndUnixTime": `${time}`,
                                        "price": 300,
                                        "quantity": 1,
                                        "instrument": {
                                          "symbol": `${short[0].SPB}`,
                                          "exchange": "SPBX",
                                          "instrumentGroup": 'SPBXM'
                                        },
                                        "user": {
                                          "portfolio": "D74357",
                                          "exchange": "SPBX"
                                        }
                                    }),
                                    headers: {

                                        'Content-Type': 'application/json',
                                        'X-ALOR-REQID' : `${uniqueId}`,
                                        Authorization: `Bearer ${JWT}`,
                                    }
                                })   
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    console.log(data);
                                })
                            })
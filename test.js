const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
const accountId = '2144725658'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();

request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`,  function(error, response, body){
                
                    const data2 = JSON.parse(body)   
                    const JWT = data2.AccessToken
                 
const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                            var time = (Math.round(new Date().getTime()/1000.0)) + 180
                
                             fetch('https://api.alor.ru/commandapi/warptrans/TRADE/v2/client/orders/actions/stopLimit',{
                
                                method: 'POST',
                                body: JSON.stringify({
                                        
                                    
                                    
                                        "side": "sell",
                                        "condition": "More",
                                        "triggerPrice": 1000,
                                        "stopEndUnixTime": `${time}`,
                                        "price": 1000,
                                        "quantity": 1,
                                        "instrument": {
                                          "symbol": "TSLA",
                                          "exchange": "SPBX",
                                          "instrumentGroup":  "SPBXM"
                                         
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

await fetch('https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.StopOrdersService/PostStopOrder',{
                
                                method: 'POST',
                                body:JSON.stringify( {
                                        
                                    "figi": 'BBG006G2JVL2',
                                    "quantity": "1",
                                    "price": {
                                        "nano": 0,
                                        "units": 80
                                        
                                    },
                                    "stopPrice": {
                                        "nano": 0,
                                        "units": 80
                                    },
                                    "direction": 1,
                                    "accountId": accountId,
                                    "expirationType": 1,
                                    "stopOrderType": 1,
                                    "expireDate": "2022-09-12T19:59:01.353Z"
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer '+ refreshToken,
                                }
                            })

                            .then((response) => {
                                return response.json();
                              })
                            .then((data) => {
                                console.log(data);
                                
                            })
                            await fetch('https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.StopOrdersService/GetStopOrders',{
                
                                method: 'POST',
                                body:JSON.stringify( {
                                        
                                    "accountId": accountId
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer '+ refreshToken,
                                }
                            })

                            .then((response) => {
                                return response.json();
                              })
                            .then((data) => {
                                console.log(data);
                                var i = 0
                                while (i<data.stopOrders.length) {
                                fetch('https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.StopOrdersService/CancelStopOrder',{
                
                                method: 'POST',
                                body:JSON.stringify( {
                                        
                                    "accountId": accountId,
                                    "stopOrderId": data.stopOrders[i].stopOrderId
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer '+ refreshToken,
                                }
                            })
                            .then((response) => {
                                return response.json();
                              })
                            .then((data) => {
                                console.log(data);
                            })
                            i+=1
                        }
                    })
                              

                    
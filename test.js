const refreshToken = 't.KYSfCOqRjzZHg-iglKBsNzCdss8J3qTNDwofUvvYqKGcehgAKtaA8D9osdhOKYaHrCxZkyX66hAHciKyS2nlOg'
const accountId = '2144725658'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();


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
                              
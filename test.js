const refreshToken = x
const accountId = '2144725658'
import request from 'request'
import fetch from 'node-fetch'
import { json } from 'express'
import  { investing } from 'investing-com-api'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper';
const tv = new TradingViewAPI();
const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)

request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`, async function(error, response, body){
                try{
                    const data2 = JSON.parse(body)   
                    const JWT = data2.AccessToken

                    await fetch('https://api.alor.ru/md/v2/clients/SPBX/D74357/orders?format=Simple',{
                
                        method: 'GET',
                                
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${JWT}`,
                        }
                    }) 
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.length)
                        console.log(data[i].id)
                            i = 0
                            while (i < data.length) {
                                const orderId = data[i].id
                                console.log(orderId)
                                const status = data[i].status 
                                if (status == 'working') {
                                    fetch(`https://api.alor.ru/commandapi/warptrans/ITRADE/v2/client/orders/${Number (orderId)}?portfolio=D74357&stop=false&jsonResponse=true&format=Simple`,{
                
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${JWT}`,
                                        }
                                    }) 
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((data) => {
                                        console.log(data);
                                    })
                                }
                                i+=1
                            }
                          
                    })
                } catch (err) {}
            })




                
                                var time = (Math.round(new Date().getTime()/1000.0)) + 180
                                request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`, async function(error, response, body){
                                    
                                        const data2 = JSON.parse(body)   
                                        const JWT = data2.AccessToken
                                await fetch('https://api.alor.ru/md/v2/Clients/SPBX/D74357/positions?format=Simple&withoutCurrency=true',{
                
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${JWT}`,
                                    }
                                })
                                    while (i < data.length) {
                                        const orderId = data[i].id
                                        const status = data[i].status 
                                        if (status == 'working') {
                                            fetch(`https://api.alor.ru/commandapi/warptrans/TRADE/v2/client/orders/${orderId}?portfolio=D74357&exchange=SPBX&stop=false&jsonResponse=true&format=Simple`,{
                        
                                                method: 'DELETE',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    Authorization: `Bearer ${JWT}`,
                                                }
                                            }) 
                                            .then((response) => {
                                                return response.json();
                                            })
                                            .then((data) => {
                                                console.log(data);
                                            })
                                        }
                                        i+=1
                                    }
                                })   
                                .then((response) => {
                                    return response.json();
                                })
                                .then((data) => {
                                    console.log(data);
                                    if (data.length != 0) {
                                        var i = 0
                                        while (i < data.length) {
                                            if (data[i].qtyUnits < 0) {
                                                var side = 'buy'
                                                var kolvo = -(data[i].qtyUnits)
                                            }
                                            if (data[i].qtyUnits > 0) {
                                                var side = 'sell'
                                                var kolvo = data[i].qtyUnits
                                            }
                                            

                                        fetch('https://api.alor.ru/commandapi/warptrans/ITRADE/v2/client/orders/actions/market',{
                
                                            method: 'POST',
                                            body: JSON.stringify({
                                        
                                        
                                        
                                                "side": side,
                                                "type": "market",
                                                "quantity": kolvo,
                                                "instrument": {
                                                    "symbol": `${data[i].symbol}`,
                                                    "exchange": "SPBX"
                                                },
                                                "user": {
                                                    "portfolio": "D74357"
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
                                        i+=1
                                        }   
                                    }
                                })  
                            })









                            if (date1.slice(0,2) == 10 & date1.slice(3,5) == 4 & day != 0 & day != 6 & j == 2 ) {
                                request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`, async function(error, response, body){
                                    try{
                                        const data2 = JSON.parse(body)   
                                        const JWT = data2.AccessToken
                    
                                        await fetch('https://api.alor.ru/md/v2/clients/SPBX/D74357/orders?format=Simple',{
                                    
                                            method: 'GET',
                                                    
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${JWT}`,
                                            }
                                        }) 
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((data) => {
                                            console.log(data);
                    
                                            
                                        })
                                  
                    
                                    } catch(err){}
                                })
                            }

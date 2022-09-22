const refreshToken = '612d99e9-4de1-402d-87a9-a05e3cce4fdd'
import request from 'request'
import fetch from 'node-fetch'
import { long, short } from './baza.js'
import { TradingViewAPI } from 'tradingview-scraper'
const tv = new TradingViewAPI();

var j = 0;

(function loops(){ 
    setTimeout(function(){
        var date = new Date()
        var date1 = date.toLocaleTimeString("sv-SE",{timeZone: "Europe/Moscow"})
        var day = date.getDay()
       
        if (date1.slice(0,2) == 11) {
            j = 0
        }
        if (date1.slice(0,2) == 9 & date1.slice(3,5) == 59 & day != 0 & day != 6 & j == 0 ) {

            request.post(`https://oauth.alor.ru/refresh?token=${refreshToken}`, async function(error, response, body){
                try{
                    const data2 = JSON.parse(body)   
                    const JWT = data2.AccessToken

                    let USDEUR =   await tv.getTicker('FX_IDC:USDEUR')
                    const USDEURlp = USDEUR.lp
                        
                    let USDHKD =   await tv.getTicker('FX:USDHKD')
                    const USDHKDlp = USDHKD.lp
                   
                    var i = 0

                    while (i<long.length) {
                        
                        let zapros =  await tv.getTicker(`${long[i].EX}:${long[i].WORLD}`)
                        const tickerbid = zapros.bid
                        const session = zapros.current_session

                        if (tickerbid != undefined & session != undefined ) {
                            
                            if (session == 'market') {
                    
                                if (long[i].EX == 'HKEX') {
                                    var Wprice = tickerbid/USDHKDlp*(long[i].MN)
                                }
                                if (long[i].EX == 'FWB') {
                                    var Wprice = tickerbid/USDEURlp
                                }
                                const price = (Wprice - (Wprice/100*1.0)).toFixed(2)

                                console.log('\n'+`Цена покупки ${long[i].SPB}: ${price}`+'\n'+`Bid ${long[i].SPB}: ${Wprice}`)

                                const kolvo = (8000/price).toFixed(0)
                    
                                const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                                var time = (Math.round(new Date().getTime()/1000.0)) + 180
                
                                await fetch('https://api.alor.ru/commandapi/warptrans/TRADE/v2/client/orders/actions/stopLimit',{
                
                                    method: 'POST',
                                    body: JSON.stringify({
                                        
                                        "side": "buy",
                                        "condition": "Less",
                                        "triggerPrice": price,
                                        "stopEndUnixTime": `${time}`,
                                        "price": price,
                                        "quantity": kolvo,
                                        "instrument": {
                                          "symbol": `${long[i].SPB}`,
                                          "exchange": "SPBX",
                                          "instrumentGroup":  'SPBXM'
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
                            }
                            i+=1  
                        }   
                    }

                    i = 0

                    while (i<short.length) {
                        
                        let zapros =  await tv.getTicker(`${short[i].EX}:${short[i].WORLD}`)
                        const tickerask = zapros.ask
                        const session = zapros.current_session

                        if (tickerask != undefined & session != undefined) {
                            
                            if (session == 'market') {

                                if (short[i].EX == 'HKEX') {
                                    var Wprice = tickerask/USDHKDlp*(short[i].MN)
                                }
                                if (short[i].EX == 'FWB') {
                                    var Wprice = tickerask/USDEURlp
                                }

                                const price = (Wprice + (Wprice/100*1.0)).toFixed(2)
                                console.log('\n'+`Цена продажи ${short[i].SPB}: ${price}`+'\n'+`Ask ${short[i].SPB}: ${Wprice}`)
                                const kolvo = (4000/price).toFixed(0)
                    
                                const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                                var time = (Math.round(new Date().getTime()/1000.0)) + 180
                
                                await fetch('https://api.alor.ru/commandapi/warptrans/TRADE/v2/client/orders/actions/stopLimit',{
                
                                    method: 'POST',
                                    body: JSON.stringify({
                                        
                                        "side": "sell",
                                        "condition": "More",
                                        "triggerPrice": price,
                                        "stopEndUnixTime": `${time}`,
                                        "price": price,
                                        "quantity": kolvo,
                                        "instrument": {
                                          "symbol": `${short[i].SPB}`,
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
                            }
                            i+=1  
                        }   
                    }

                } catch (err)  {}
    
            })
            j+=1
        }

        if (date1.slice(0,2) == 10 & date1.slice(3,5) == 3 & day != 0 & day != 6 & j == 1 ) {
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
                        console.log(data)
                        if (data.length != 0) {
                            var i = 0
                            while (i < data.length) {
                                const orderId = data[i].id
                                const status = data[i].status 
                                if (status == 'working') {
                                    fetch(`https://api.alor.ru/commandapi/warptrans/ITRADE/v2/client/orders/${orderId}?portfolio=D74357&exchange=SPBX&stop=false&jsonResponse=true&format=Simple`,{
                
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
                        }
                    })
                } catch (err) {}
            })
            j+=1
        }
        loops()
    },10)
})()          
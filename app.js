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
        console.log(date1)
       
        if (date1.slice(0,2) == 10) {
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
                        if (tickerbid != undefined) {
                    
                            if (long[i].EX == 'HKEX') {
                                var Wprice = tickerbid/USDHKDlp*(long[i].MN)
                            }
                            if (long[i].EX == 'FWB') {
                                var Wprice = tickerbid/USDEURlp
                            }
                            const price = (Wprice - (Wprice/100*1.25)).toFixed(2)

                            console.log(price)

                            const kolvo = 8000/price
                    
                            const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                            var time = (Math.round(new Date().getTime()/1000.0)) + 120
                
                            fetch('https://api.alor.ru/warptrans/ITRADE/v2/client/orders/actions/takeProfitLimit',{
                
                                method: 'POST',
                                body: JSON.stringify({
                                        
                                    Quantity : 1,
                                    Side: "buy",
                                    TriggerPrice: `${price}`,
                                    Price: `${price}`,
                                                
                                    Instrument: {
                                        Symbol: `${long[i].SPB}`,
                                        Exchange: "SPBX"
                                    },
                                    User: {
                                        Account: "L01-00000F00",
                                        Portfolio: "D74357"
                                    },
                                    OrderEndUnixTime: `${time}`
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-ALOR-REQID' : `${uniqueId}`,
                                    Authorization: `Bearer ${JWT}`,
                                }
                            }) 
                            i+=1  
                        }   
                    }

                    i = 0

                    while (i<short.length) {
                        
                        let zapros =  await tv.getTicker(`${short[i].EX}:${short[i].WORLD}`)
                        const tickerask = zapros.ask
                        if (tickerask != undefined) {

                            if (short[i].EX == 'HKEX') {
                                var Wprice = tickerask/USDHKDlp*(short[i].MN)
                            }
                            if (short[i].EX == 'FWB') {
                                var Wprice = tickerask/USDEURlp
                            }

                            const price = (Wprice + (Wprice/100*1.25)).toFixed(2)
                            console.log(price)
                            const kolvo = 4000/price
                    
                            const uniqueId = (Math.random() * (99999999999 - 1) + 1).toFixed(0)
                
                            var time = (Math.round(new Date().getTime()/1000.0)) + 120
                
                            fetch('https://api.alor.ru/warptrans/ITRADE/v2/client/orders/actions/takeProfitLimit',{
                
                                method: 'POST',
                                body: JSON.stringify({
                                        
                                    Quantity : 1,
                                    Side: "sell",
                                    TriggerPrice: `${price}`,
                                    Price: `${price}`,
                                                
                                    Instrument: {
                                        Symbol: `${short[i].SPB}`,
                                        Exchange: "SPBX"
                                    },
                                    User: {
                                        Account: "L01-00000F00",
                                        Portfolio: "D74357"
                                    },
                                    OrderEndUnixTime: `${time}`
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-ALOR-REQID' : `${uniqueId}`,
                                    Authorization: `Bearer ${JWT}`,
                                }
                            })   
                            i+=1  
                        }   
                    }

                } catch (err)  {}
    
            })
            j+=1
        }  
    loops()
    },1000)
})()                     
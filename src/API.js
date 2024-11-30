import axios from "axios";
const BASE_URL = "https://raschet-proxy.vercel.app"

export async function getBondInfo(ticker) {
    const data = {};
    try {
        const response = await axios.get(BASE_URL +'/api/get-bond-info', {
            params: {
                ticker: ticker  
            }
        });
        
        const bond = await response.data.instrument; 

        data['couponQuantityPerYear'] = bond.couponQuantityPerYear;
        data['nominal'] = bond.nominal.units;
        data['maturityDate'] = bond.maturityDate;
        console.log('Первый запрос успешен');

        const response2 = await axios.get(BASE_URL + '/api/get-bond-coupon', {
            params: {
                figi: bond.figi,
                from: bond.placementDate,
                to: bond.maturityDate
            }
        });

        const couponinfo = await response2.data.events; 
        data['couponPeriod'] = couponinfo[1].couponPeriod;
        data['coupon'] = couponinfo[1].payOneBond.units;
        
        console.log('Второй запрос успешен');
        return data; 

    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        throw error;  // Пробрасываем ошибку дальше, чтобы вызвать обработку в вызывающем коде
    }
}

import axios from "axios";

export async function getBondInfo(ticker) {
    const data = {};
    try {
        const response = await axios.get('https://raschet-xkev.onrender.com/api/get-bond-info', {
            params: {
                ticker: ticker  
            }
        });
        
        const bond = await response.data.instrument; 

        data['couponQuantityPerYear'] = bond.couponQuantityPerYear;
        data['nominal'] = bond.nominal.units;
        data['maturityDate'] = bond.maturityDate;

        const response2 = await axios.get('https://raschet-xkev.onrender.com/api/get-bond-coupon', {
            params: {
                figi: bond.figi,
                from: bond.placementDate,
                to: bond.maturityDate
            }
        });

        const couponinfo = await response2.data.events; 
        data['couponPeriod'] = couponinfo[1].couponPeriod;
        data['coupon'] = couponinfo[1].payOneBond.units;
        
        console.log('Информация об облигации:', couponinfo);
        return data; 

    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        //throw error;  // Пробрасываем ошибку дальше, чтобы вызвать обработку в вызывающем коде
    }
}

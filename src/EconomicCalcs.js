export function growth_rates(num1, num2) {
    if(num1 == "" || num2 == ""){
        return 0;
    }
    return ((num1 - num2) / num2 * 100).toFixed(3);
}
export function target_price(num1, num2) {
    if(num1 == "" || num2 == ""){
        return 0;
    }
    return (num1 / num2).toFixed(3);
}
export function marginality(num1, num2) {
    if(num1 == "" || num2 == ""){
        return 0;
    }
    return ((num1 / num2) * 100).toFixed(3);
}
export function netdebt_ebitda(num1, num2) {
    if(num1 == "" || num2 == ""){
        return 0;
    }
    return (num1 / num2).toFixed(3);
}

export function percent(num1, num2) {
    if(num1 == "" || num2 == ""){
        return 0;
    }
    return ((num1 * 100) / num2).toFixed(3);
}

export function calculation_bonds(nominal_value, coupon, coupon_period, repayment_date, date_purchase, purchase_price) {
    if (
        nominal_value == "" ||
        coupon == "" ||
        coupon_period == "" ||
        purchase_price == ""  ||
        repayment_date == "" ||
        date_purchase == "" 
    ) {
        return 0;
    }
    nominal_value = parseFloat(nominal_value);
    coupon = parseFloat(coupon);
    coupon_period = parseFloat(coupon_period);
    purchase_price = parseFloat(purchase_price);
    repayment_date = new Date(repayment_date);
    date_purchase = new Date(date_purchase);
    // console.log("Дата прихода и ухода: ");
    // console.log(repayment_date);
    // console.log(date_purchase);
    
    const t = Math.round((repayment_date - date_purchase) / (1000 * 60 * 60 * 24)); 
    // console.log("пройдет дней: ");
    // console.log(t);
    if (t <= 0 || coupon_period <= 0) {
        return 0; 
    }
    const bonus = nominal_value - purchase_price;
    const counts = Math.floor(t / coupon_period);
    // console.log("купон будет получен раз: ");
    // console.log(counts);
    const p = coupon * counts + bonus;

    return percent(p + nominal_value, nominal_value);
}
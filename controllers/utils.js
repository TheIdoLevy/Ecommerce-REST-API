const validateCreditCard = (number) => {
    let final = 0;
    for(let digit = 0; digit < number.length; digit ++) {
        if((digit+1)%2===1){
            final += Number(number[digit]);
        } else {
            if(number*2<=9){
                final += Number(number[digit]*2);
            } else {
                final += Number((number[digit]*2)-9);
            };
        };
    };
    if(final === 0) return false;
    if(final % 2 === 0) return true;
    return false;
};

module.exports = validateCreditCard;
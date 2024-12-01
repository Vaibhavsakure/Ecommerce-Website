window.onload = function () {
    const name = document.getElementById('name');
    const cardnumber = document.getElementById('cardnumber');
    const expirationdate = document.getElementById('expirationdate');
    const securitycode = document.getElementById('securitycode');
    const output = document.getElementById('output');
    const ccicon = document.getElementById('ccicon');
    const ccsingle = document.getElementById('ccsingle');
    const generatecard = document.getElementById('generatecard');
    
    let cctype = null;

    // Mask the Credit Card Number Input
    var cardnumber_mask = new IMask(cardnumber, {
        mask: [
            {
                mask: '0000 0000 0000 0000',
                regex: '^4\\d{0,15}',
                cardtype: 'visa'
            },
            {
                mask: '0000 0000 0000 0000',
                regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
                cardtype: 'mastercard'
            },
            {
                mask: '0000 0000 0000 0000',
                regex: '^3[47]\\d{0,13}',
                cardtype: 'american express'
            },
            // Add more card types as needed
        ],
        dispatch: function (appended, dynamicMasked) {
            var number = (dynamicMasked.value + appended).replace(/\D/g, '');
            for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
                let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
                if (number.match(re) != null) {
                    return dynamicMasked.compiledMasks[i];
                }
            }
        }
    });

    // Mask the Expiration Date
    var expirationdate_mask = new IMask(expirationdate, {
        mask: 'MM{/}YY',
        groups: {
            YY: new IMask.MaskedPattern.Group.Range([0, 99]),
            MM: new IMask.MaskedPattern.Group.Range([1, 12]),
        }
    });

    // Add event listeners for inputs
    cardnumber.addEventListener('input', function () {
        // Update card type based on card number
        const cardTypeData = cardnumber_mask.masked.compiledMasks.find(mask => mask.regex.test(cardnumber.value));
        cctype = cardTypeData ? cardTypeData.cardtype : null;
        if (cctype) {
            ccicon.src = `./img/${cctype}.png`; // Make sure you have card type images in the img folder
        } else {
            ccicon.src = '';
        }
    });

    generatecard.addEventListener('click', function () {
        output.innerHTML = `Name: ${name.value}<br>Card Number: ${cardnumber.value}<br>Expiration: ${expirationdate.value}<br>Security Code: ${securitycode.value}`;
    });
};

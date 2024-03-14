'use strict';
document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector('#input'); 
    let output = document.querySelector('#output'); 
    let copyButton = document.querySelector('#copy')
    const conversionMap = {
        'a' : 'ა' ,
        'b' : 'ბ' ,
        'g' : 'გ' ,
        'd' : 'დ' ,
        'e' : 'ე' ,
        'v' : 'ვ' ,
        'z' : 'ზ' ,
        'T' : 'თ' ,
        'i' : 'ი' ,
        'k' : 'კ' ,
        'l' : 'ლ' ,
        'm' : 'მ' ,
        'n' : 'ნ' ,
        'o' : 'ო' ,
        'p' : 'პ' ,
        'J' : 'ჟ' ,
        'r' : 'რ',
        's' : 'ს' ,
        't' : 'ტ' ,
        'u' : 'უ' ,
        'f' : 'ფ' ,
        'q' : 'ქ' ,
        'R' : 'ღ',
        'y' : 'ყ',
        'S' : 'შ',
        'C' : 'ჩ',
        'c' : 'ც',
        'Z' : 'ძ',
        'w' : 'წ' ,
        'W' : 'ჭ' ,
        'x' : 'ხ',
        'j' : 'ჯ' ,
        'h' : 'ჰ' ,
        //

        'A' : 'ა',
        'B' : 'ბ',
        'F' : 'ფ',
        'E' : 'ე',
        'M' : 'მ',
        
    };
    function converter(text) {
        return text.replace(/./gi, match => conversionMap[match] || match);
    }
    

    input.addEventListener('input', function() {
        let text = input.value;
        let convertedText = converter(text);
        output.textContent  = convertedText;
    })

    copyButton.addEventListener('click', function() {
        let copyText = output.textContent;
        if(copyText.length > 0) {
            navigator.clipboard.writeText(copyText);
        }
    })


});

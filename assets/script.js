'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#input');
    const output = document.querySelector('#output');
    const copyButton = document.querySelector('#copy');
    const clearButton = document.querySelector('#clear');
    const copyStatus = document.querySelector('#copy-status');
    const charCount = document.querySelector('#char-count');

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
        // capitals that have no Georgian letter of their own fall back to their lowercase letter,
        // so an accidental Shift or Caps Lock does not leave raw Latin text in the output
        'A' : 'ა',
        'B' : 'ბ',
        'D' : 'დ',
        'E' : 'ე',
        'F' : 'ფ',
        'G' : 'გ',
        'H' : 'ჰ',
        'I' : 'ი',
        'K' : 'კ',
        'L' : 'ლ',
        'M' : 'მ',
        'N' : 'ნ',
        'O' : 'ო',
        'P' : 'პ',
        'Q' : 'ქ',
        'U' : 'უ',
        'V' : 'ვ',
        'X' : 'ხ',
        'Y' : 'ყ',
    };

    const STORAGE_KEY = 'lat-to-geo:input';
    let statusTimer = null;

    function converter(text) {
        return text.replace(/./g, match => conversionMap[match] || match);
    }

    function autoGrow() {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
    }

    function render() {
        const text = input.value;
        output.textContent = converter(text);
        if (charCount) charCount.textContent = String(text.length);
        autoGrow();
    }

    function showStatus(message) {
        if (!copyStatus) return;
        copyStatus.textContent = message;
        copyStatus.classList.add('is-visible');
        clearTimeout(statusTimer);
        statusTimer = setTimeout(() => copyStatus.classList.remove('is-visible'), 1800);
    }

    input.addEventListener('input', () => {
        render();
        try { localStorage.setItem(STORAGE_KEY, input.value); } catch {}
    });

    copyButton.addEventListener('click', async () => {
        const copyText = output.textContent;
        if (!copyText.length) {
            showStatus('დასაკოპირებელი ტექსტი არ არის');
            return;
        }
        try {
            await navigator.clipboard.writeText(copyText);
            showStatus('დაკოპირებულია');
        } catch {
            showStatus('კოპირება ვერ მოხერხდა — მონიშნე ტექსტი ხელით');
        }
    });

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            input.value = '';
            render();
            try { localStorage.removeItem(STORAGE_KEY); } catch {}
            input.focus();
        });
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) input.value = saved;
    } catch {}
    render();
});

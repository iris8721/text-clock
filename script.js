function updateClock() {
    document.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
        el.style.color = '';
        el.style.textShadow = '';
    });
    
    const now = new Date();
    let hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    
    document.querySelector('.it').classList.add('active');
    document.querySelector('.is').classList.add('active');
    
    const remainder = minutes % 5;
    const roundedMinutes = minutes - remainder;
    
    const dots = document.querySelectorAll('.dot');
    for (let i = 0; i < remainder; i++) {
        dots[i].classList.add('active');
    }
    
    const activate = (...selectors) => {
        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.classList.add('active');
        });
    };
    
    const minuteMap = {
        0: ['.oclock'],
        5: ['.five', '.minutes', '.past'],
        10: ['.ten', '.minutes', '.past'],
        15: ['.quarter', '.past'],
        20: ['.twenty', '.minutes', '.past'],
        25: ['.twenty', '.five', '.minutes', '.past'],
        30: ['.half', '.past'],
        35: ['.twenty', '.five', '.minutes', '.to'],
        40: ['.twenty', '.minutes', '.to'],
        45: ['.quarter', '.to'],
        50: ['.ten', '.minutes', '.to'],
        55: ['.five', '.minutes', '.to']
    };
    
    if (roundedMinutes >= 35) {
        hours = hours % 12 + 1;
    }
    
    if (minuteMap[roundedMinutes]) {
        activate(...minuteMap[roundedMinutes]);
    }
    
    const hourMap = {
        1: '.one', 2: '.two', 3: '.three', 4: '.four',
        5: '.five-hour', 6: '.six', 7: '.seven', 8: '.eight',
        9: '.nine', 10: '.ten-hour', 11: '.eleven', 12: '.twelve'
    };
    
    activate(hourMap[hours]);
    
    const phrase = Array.from(document.querySelectorAll('.text-content span.active'), el => el.textContent).join(' ');
    document.querySelector('.clock-container').setAttribute('aria-label', remainder ? `${phrase}, plus ${remainder} minute${remainder === 1 ? '' : 's'}` : phrase);
}

function randomFlicker() {
    const activeWords = document.querySelectorAll('.text-content span.active');
    if (activeWords.length === 0) return;
    
    const randomWord = activeWords[Math.floor(Math.random() * activeWords.length)];
    
    const pattern = Math.random() > 0.5 ? 'quick' : 'slowToFast';
    
    if (pattern === 'quick') {
        quickFlicker(randomWord, 0, Math.random() > 0.5 ? 2 : 3);
    } else {
        slowToFastFlicker(randomWord);
    }
}

function quickFlicker(word, count, maxCount) {
    if (count >= maxCount) return;
    if (!word.classList.contains('active')) return;
    
    word.style.color = '#8b0000';
    word.style.textShadow = '0 0 5px rgba(139, 0, 0, 0.5)';
    
    setTimeout(() => {
        if (!word.classList.contains('active')) return;
        
        word.style.color = '#ff3333';
        word.style.textShadow = '0 0 10px rgba(255, 51, 51, 0.8), 0 0 20px rgba(255, 51, 51, 0.6), 0 0 30px rgba(255, 51, 51, 0.4)';
        
        setTimeout(() => {
            quickFlicker(word, count + 1, maxCount);
        }, 60);
    }, 80);
}

function slowToFastFlicker(word) {
    const timings = [
        { dark: 200, light: 150 },
        { dark: 150, light: 100 },
        { dark: 100, light: 80 },
        { dark: 60, light: 50 },
        { dark: 50, light: 40 }
    ];
    
    let currentStep = 0;
    
    function flicker() {
        if (currentStep >= timings.length) return;
        if (!word.classList.contains('active')) return;
        
        const timing = timings[currentStep];
        
        word.style.color = '#8b0000';
        word.style.textShadow = '0 0 5px rgba(139, 0, 0, 0.5)';
        
        setTimeout(() => {
            if (!word.classList.contains('active')) return;
            
            word.style.color = '#ff3333';
            word.style.textShadow = '0 0 10px rgba(255, 51, 51, 0.8), 0 0 20px rgba(255, 51, 51, 0.6), 0 0 30px rgba(255, 51, 51, 0.4)';
            
            currentStep++;
            setTimeout(flicker, timing.light);
        }, timing.dark);
    }
    
    flicker();
}

function scheduleFlicker() {
    const minWait = 3000;
    const maxWait = 10000;
    const nextFlicker = Math.random() * (maxWait - minWait) + minWait;
    
    setTimeout(() => {
        randomFlicker();
        scheduleFlicker();
    }, nextFlicker);
}

updateClock();
setInterval(updateClock, 1000);
scheduleFlicker();
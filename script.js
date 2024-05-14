const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const btn = document.querySelector('button')


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;



function loadParagraph(){
    const paragraph=["In Harry's world fate works not only through powers and objects such as prophecies, the Sorting Hat, wands, and the Goblet of Fire, but also through people. Repeatedly, other characters decide Harry's future for him, depriving him of freedom and choice.",
        "Our typology is built on three dimensions: internality, types of participants, and the degree of effective resistance. For our study, a civil war is any armed conflict that involves military action internal to the metropole, the active participation of the national government, and effective resistance by both sides. With these criteria, we differentiate civil wars from other types of internal violent conflicts.",
        "These issues not only made the samples similar, but also different in their composition. The researchers will conduct periodic studies to explore whether these value changes are permanent and continue into adulthood. We do not know what if any changes will take place in their values as they grow older, and we will continue to explore their values in our longitudinal studies of the impact of the 9/11 terrorist attacks."
    ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);

    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML+=`<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>{input.focus()})
    typingText.addEventListener('click',()=>{ input.focus() })
}

function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerHTML === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerHTML = mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerHTML=timeLeft;
        let wpmval = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60)
        wpm.innerHTML=wpmval;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerHTML=0;
    mistakes.innerHTML=0;
    time.innerHTML=timeLeft;
    input.value='';
}


input.addEventListener("input",initTyping);
btn.addEventListener('click',reset);

loadParagraph();
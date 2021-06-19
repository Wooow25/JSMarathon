import logs from './logs.js'
export const getRandom = (number) => Math.ceil(Math.random()*number); 

export const createElem = (tag, classname) => {
    const $tag = document.createElement(tag)
    if (classname){
        $tag.classList.add(classname);
    }
    return $tag
}

const chat = document.querySelector('.chat')
export const generateLogs = (type, p1, p2, damage=0 ) => {
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}   `;
    let el;
    let text
    switch (type){
        case 'start': 
             text= logs[type].replace('[time]', time).replace('[player1]',p1.name.toUpperCase()).replace('[player2]',p2.name.toUpperCase());
            el = `<p>${text} <p>`;
            break;
        
        case 'draw': 
             text= logs[type]
            el = `<p>${time} ${text} <p>`;
            break;
        
        case 'end': 
             text= logs[type][getRandom(logs[type].length -1)].replace('[playerWins]', p1.name.toUpperCase()).replace('[playerLose]',p2.name.toUpperCase());
            el = `<p>${time} ${text} <p>`;
            break;
        
        case 'hit': 
             text= logs[type][getRandom(logs[type].length -1)].replace('[playerKick]',p1.name.toUpperCase()).replace('[playerDefence]',p2.name.toUpperCase());
            el = `<p>${time} ${text} ${p2.name.toUpperCase()} получил урон: ${damage} Жизни: ${p2.hp}<p>`;
            break;
        
        case 'defence':
             text= logs[type][getRandom(logs[type].length -1)].replace('[playerKick]',p1.name.toUpperCase()).replace('[playerDefence]',p2.name.toUpperCase());
            el = `<p>${time} ${text}   Жизни ${p1.name.toUpperCase()}: ${p1.hp}<p>`;
            break;
        
        default: 
        el = 'WHAT???'
        break;

    }
    chat.insertAdjacentHTML('afterbegin',el)
}

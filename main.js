import { player1,player2 } from './player.js ';
import { enemyAttack, playerAttack} from './attack.js';
import getRandom from './utils.js'
import logs from './logs.js'
console.log(player1 , player2)

 
const start = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const formFight = document.querySelector('.control ');
const chat = document.querySelector('.chat')

const  createReloadButton = () => {
    const reloadWrap = createElem('div', "reloadWrap");
    const button = createElem('button', "button");
    reloadWrap.appendChild(button)
    start.appendChild(reloadWrap)
    button.innerHTML= "Restart";
    button.addEventListener('click', function(){
        window.location.reload()
    } )  
}

const createElem = (tag, classname) => {
    const $tag = document.createElement(tag)
    if (classname){
        $tag.classList.add(classname);
    }
    return $tag
}

const createPlayer = ( player ) =>{
    const playNum = createElem('div','player'+player.numb);

    const progressbar= createElem('div','progressbar' );
    playNum.appendChild(progressbar);

    const life= createElem('div','life');
    progressbar.appendChild(life);
    life.style.width=player.hp+'%'

    const name= createElem('div','name');
    progressbar.appendChild(name);
    name.innerHTML=player.name;

    const character= createElem('div','character');
    playNum.appendChild(character);
    const img= createElem('img');
    img.src=player.img;
    character.appendChild(img);

    return playNum;
}

const generateLogs = (type, p1, p2, damage=0 ) => {
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
            el = `<p>${time} ${text} Урон: ${damage} Жизни: ${p1.hp}<p>`;
            break;
        
        case 'defence':
             text= logs[type][getRandom(logs[type].length -1)].replace('[playerKick]',p1.name.toUpperCase()).replace('[playerDefence]',p2.name.toUpperCase());
            el = `<p>${time} ${text} Жизни: ${p1.hp}<p>`;
            break;
        
        default: 
        el = 'WHAT???'
        break;

    }

    chat.insertAdjacentHTML('afterbegin',el)
}

//по идее, есть смысл перенести функцию в отдельный модуль, но она потребует импорта и winnTitle и createElem  
//это нормально? + не нашла,где стоит деструктуризацию использовать
const winnTitle = createElem('div','loseTitle');
const fightResult = () =>{
    if (player1.hp<=0 && player2.hp<=0){
        winnTitle.innerHTML= 'draw';
        generateLogs( 'draw' , player1, player2);
        return true
    } else if (player1.hp<=0){
        winnTitle.innerHTML= player2.name +' win';
        generateLogs( 'end' , player2, player1);
        return true

    } else if (player2.hp<=0) {
        winnTitle.innerHTML= player1.name +' win';
        generateLogs('end', player1, player2);
        return true
    } 
    return false
}


start.append(createPlayer(player1))
start.append(createPlayer(player2))
generateLogs( 'start' , player1, player2)

formFight.addEventListener('submit', event => {
    event.preventDefault();

    
    const enemy = enemyAttack();
    const attack = playerAttack();


    if (attack.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs( 'hit' , player1, player2, enemy.value)
    } else{
        generateLogs( 'defence' , player2, player1)
    }


    if (enemy.defence !== attack.hit){
        player2.changeHP(attack.value);
        player2.renderHP();
        generateLogs( 'hit', player2 , player1, attack.value)
    }else{
        generateLogs( 'defence', player1, player2)
    }



    const result =fightResult()
    if (result) {
        start.appendChild(winnTitle);
        fightButton.disabled = true;
        createReloadButton();
    }
        
})
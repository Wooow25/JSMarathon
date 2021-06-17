import { player1,player2 } from './player.js ';
import { enemyAttack, playerAttack,fightResult, winnTitle} from './attack.js';
import {createElem, generateLogs} from "./utils.js";


 
const start = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const formFight = document.querySelector('.control ');


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
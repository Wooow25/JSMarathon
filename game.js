import { enemyAttack, playerAttack,fightResult, winnTitle} from './attack.js';
import {createElem, generateLogs} from "./utils.js";
import Player from './player.js';

const formFight = document.querySelector('.control ');
const start = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');

export const player1 = new Player({ 
    numb: '1',
    name:'scorpion',
    hp : 100,
    img:'img/scorpion.gif',
    rootSelector:'arenas',
});

export const player2 =new Player( {
    numb: '2',
    name:'kitana',
    hp : 100,
    img:'img/kitana.gif',
    rootSelector:'arenas',
});

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


class Game {
    // constructor(props){
    // }


    start = () =>{
        player1.createPlayer();
        player2.createPlayer();
        generateLogs( 'start' , player1, player2)


    formFight.addEventListener('submit', event => {
    event.preventDefault();
 
    const {hit: hitEnemy, defence: defenceEnemy,  value:valueEnemy} = enemyAttack();
    const {hit: hitPlayer, defence: defencePlayer,  value:valuePlayer} = playerAttack();


    if (defencePlayer!== hitEnemy){
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs( 'hit' , player2, player1, valueEnemy)
    } else{
        generateLogs( 'defence' , player2, player1)
    }


    if (defenceEnemy !== hitPlayer){
        player2.changeHP(valuePlayer);
        player2.renderHP();
        generateLogs( 'hit', player1 , player2, valuePlayer)
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

    }
}


export default Game;
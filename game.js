import { enemyAttack, playerAttack,fightResult, winnTitle} from './attack.js';
import {createElem, generateLogs} from "./utils.js";
import Player from './player.js';

class Game {
    constructor(){
        this.formFight= document.querySelector('.control ');
        this.root= document.querySelector('.arenas');
        this.fightButton= document.querySelector('.button');
        this.player1 =new Player({ 
            numb: '1',
            name:'scorpion',
            hp : 100,
            img:'img/scorpion.gif',
            rootSelector:'arenas',
        });
        this.player2 = new Player( {
            numb: '2',
            name:'kitana',
            hp : 100,
            img:'img/kitana.gif',
            rootSelector:'arenas',
        });
    }

    createReloadButton = () => {
        const reloadWrap = createElem('div', "reloadWrap");
        const button = createElem('button', "button");
        reloadWrap.appendChild(button);
        this.root.appendChild(reloadWrap);
        button.innerHTML= "Restart";
        button.addEventListener('click', function(){
            window.location.reload()
        } )  
    }

    start = () =>{
        this.player1.createPlayer();
        this.player2.createPlayer();
        generateLogs( 'start' , this.player1, this.player2)

    this.formFight.addEventListener('submit', event => {
        event.preventDefault();
 
        const {hit: hitEnemy, defence: defenceEnemy,  value:valueEnemy} = enemyAttack();
        const {hit: hitPlayer, defence: defencePlayer,  value:valuePlayer} = playerAttack();


        if (defencePlayer!== hitEnemy){
            this.player1.changeHP(valueEnemy);
            this.player1.renderHP();
            generateLogs( 'hit' , this.player2, this.player1, valueEnemy)
        } else{
            generateLogs( 'defence' , this.player2, this.player1)
        }


        if (defenceEnemy !== hitPlayer){
            this.player2.changeHP(valuePlayer);
            this.player2.renderHP();
            generateLogs( 'hit', this.player1 , this.player2, valuePlayer)
        }else{
            generateLogs( 'defence', this.player1, this.player2)
        }

        const result =fightResult(this.player1, this.player2)
        if (result) {
            this.root.appendChild(winnTitle);
            this.fightButton.disabled = true;
            this.createReloadButton();
        }
        
    })

    }
}


export default Game;
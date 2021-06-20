import {createElem} from './add/utils.js'

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const $buttons = document.querySelectorAll('.button');
const $back = document.querySelector('.backpage');
var clicked=0;

function createEmptyPlayerBlock() {
    const el = createElem('div', ['character', 'div11', 'disabled']);
    const img = createElem('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}


const mouseMovef = (imgSrc, item) =>{
    if (imgSrc === null){
        if (clicked===1){
            $enemy.children[0].src=item.img;
        }else if (clicked===0){
            $player.children[0].src=item.img;
        }
    }
}


async function init() {
    localStorage.removeItem('player1');
    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    let imgSrc = null;
    createEmptyPlayerBlock();

    const q1 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    const q2= await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

    

    $buttons.forEach(button =>{
        button.addEventListener('click', event=>{
            const target=  event.target.innerHTML;
            $back.style.display='none';
            players.forEach(item => {
            const el = createElem('div', ['character', `div${item.id}`]);
            const img = createElem('img');
            el.addEventListener('mousemove',function(){mouseMovef(imgSrc,item,$player)},false) 
            img.src = item.avatar;
            img.alt = item.name;
            el.appendChild(img);
            $parent.appendChild(el);


            switch (target.trim()){
                case 'All Random': console.log('RANDOM');
                const elClone = el.cloneNode(true);
                    el.parentNode.replaceChild(elClone, el);
                    $player.children[0].src=q1.img;
                    $enemy.children[0].src=q2.img;
                    localStorage.setItem('player1', JSON.stringify(q1));
                    localStorage.setItem('player2', JSON.stringify(q2));
                    $back.style.display='none';
                    const fight = createElem('img','fight');
                    fight.src='../assets/fight.gif';
                    $parent.appendChild(fight);

                    setTimeout(() => {
                        window.location.pathname = 'arena.html'
                    }, 2000);
                    break;


                case 'Choose player': console.log('ONE');
                    el.addEventListener('click', () => {
                        localStorage.setItem('player1', JSON.stringify(item));
                        $enemy.children[0].src=q2.img;
                        localStorage.setItem('player2', JSON.stringify(q2));
                        el.classList.add('active');
                        const fight = createElem('img','fight');
                        fight.src='../assets/fight.gif';
                        $parent.appendChild(fight);
    
                        setTimeout(() => {
                            window.location.pathname = 'arena.html'
                        }, 2000);
                    });
                    break;


                case 'Choose both': console.log('TWO');
                    el.addEventListener('click', () => {
                        ++clicked;
                        console.log(clicked)
                        if (clicked===1){
                            localStorage.setItem('player1', JSON.stringify(item));
                            el.classList.add('active');
                            choose = true;
                        }
                        if (clicked===2){
                            localStorage.setItem('player2', JSON.stringify(item));
                            el.classList.add('active');
                            const fight = createElem('img','fight');
                            fight.src='../assets/fight.gif';
                            $parent.appendChild(fight);        
                            setTimeout(() => {
                                window.location.pathname = 'arena.html'
                            }, 1000);

                        }

                    });
                    break;
                default: console.log('smth wrong');
            }
        })
    })
    
    
    }
    )}

init();

// // fetch - промис, поэтому нужно куда-то сохранить
// const q = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players', {
//     // method: 'POST', // по-умолчанию GET
// })


// let players = [];
// q.then(response => {
//     console.log(response)
//     return response.json();
// }).then (data =>console.log(data) )



// async function getPlayers(){
//     const q = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
//     const body = await q.json();
//     console.log(body);
//     return body;
// }

// getPlayers()

// const q = fetch('http://reactmarathon-api.herokuapp.com/api/mk/players', {
//     method: 'POST', // по-умолчанию GET
// })

fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
        hit,
        defence,
    })
});
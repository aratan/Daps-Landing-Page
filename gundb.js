//conexion
var gun = Gun(['http://localhost:8765/gun', 'https://gunjs.herokuapp.com/gun']);
var user = gun.user();
var say = [];
var guardo = [];

//auto matic login
document.querySelector("#send").style.display = 'none';


/* inicio bien */
document.getElementById("up").addEventListener('click', (e) => {
  user.create(document.getElementById("alias").value, document.getElementById("pass").value);
});


document.getElementById("sign").addEventListener('submit', (e) => {
  e.preventDefault();
  user.auth(document.getElementById("alias").value, document.getElementById("pass").value);
});

/* fin bien */



/* 1 */
document.querySelector('#said').addEventListener('submit', function (e) {
  e.preventDefault();
  
  if (!user.is) { 
    return 
  }

  user.get('said').set(document.querySelector('#say').value);
  document.querySelector('#say').value;

});


/*ok*/


/* 2 */
function UI(say, id) {
// pasamos la data a un array para poder usarla mas comodamente
// ahora la podemos iterar entera, por parte o con filtros
  guardo.push(say)
  console.log(`>>> ${guardo} `);
  document.querySelector("#escribe").innerHTML = guardo[3];

  //document.querySelector("#escribe").innerHTML = say;
  console.log(typeof(say), say, id) //hasta aqui funciona
  
   //Pruebas filtro por id funciona
  if ( id == 'l6htii24K5AgmTt'){
    console.log(' => ', say); //
    //document.querySelector("#escribe").innerHTML = say;
  }

};
/* ok */

/* 3 */
gun.on('auth', function () {
  document.querySelector("#sign").style.display = 'none';
  document.querySelector("#send").style.display = 'block';
  //$('#sign').hide();
  user.get('said').map().once(UI);
});

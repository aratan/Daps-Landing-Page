const url = 'https://ipfs.io/ipfs/'
const file = '/master.m3u8'
let hash = 'QmPyftBtQJmmjRkSaiqR4xx5CSkFagmTYFKaJbSJwWftf8'
// video va siempre con hls.js
var video = document.getElementById('video');
      if (Hls.isSupported()) {
        var hls = new Hls({
          debug: true,
        });
        hls.loadSource(`${url}${hash}${file}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          video.muted = true;
          video.play();
        });
      }
      
/*  hls.js no es compatible con plataformas que no tienen habilitadas las extensiones de 
    origen multimedia (MSE). Cuando el navegador tiene soporte HLS incorporado 
    (verifique usando 'canPlayType'), podemos proporcionar un manifiesto HLS (es decir, 
    URL.m3u8) directamente al elemento de video a través de la propiedad 'src'. 
    Esto es usar el soporte incorporado del elemento de video simple, sin usar hls.js.
*/
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = `${url}${hash}${file}`;
        video.addEventListener('canplay', function () {
          video.play();
        });
      }
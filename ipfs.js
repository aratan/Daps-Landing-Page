// Configuración de conexión
const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', {
    protocol: 'https'
});


$("#upload").on("change", function () {
    var fichero = new FileReader();

    fichero.onload = function (e) {

        const datos = buffer.Buffer(fichero.result);
        ipfs.add(datos, (err, result) => {
            console.log(err, result);

            let ipfsLink = "<a href='https://ipfs.io/ipfs/" + result[0].hash + "'>https://ipfs.io/ipfs/" + result[0].hash + "</a>";
            document.getElementById("link").innerHTML = ipfsLink;

        })
    }
    fichero.readAsArrayBuffer(this.files[0]);
});

function buscar() {
    let local = document.getElementById("localizacao").value;

    if(local === "") {
        alert("Digite uma localização!");
    } else {
        document.getElementById("resultado").innerText =
        "Mostrando restaurantes próximos de: " + local;
    }
}

function detalhes(nome) {
    alert("Mais informações sobre o restaurante: " + nome);
}

function feedback() {
    alert("Obrigado pelo seu feedback!");
}
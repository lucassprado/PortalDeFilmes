window.onload = () => {
    console.log('Olá');
    function executaPesquisa(texto) {
        texto = texto.replaceAll(' ', '+');
        console.log('Entrou função');
        let xhr = new XMLHttpRequest;
        xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=7b5d0ea5929b85f5afdd83a9afa18458&query=${texto}&page=1&language=pt-BR`)
        xhr.onload = () => {
            let resposta = JSON.parse(xhr.responseText)['results'];
            console.log(resposta);
            let escreve = document.getElementById('addDestaque');

            escreve.innerHTML = '';
            for (i = 0; i < resposta.length; i ++){
            let titulo = resposta[i]['title'];
            let poster = resposta[i]['poster_path'];
            let id = resposta[i]['id'];
            
            escreve.innerHTML += `
                <div class="col-12 col-sm-12 col-md-6 col-lg-3">
                <a href="https://www.themoviedb.org/movie/${id}" target="blank"><img src="https://image.tmdb.org/t/p/w300${poster}" alt="${titulo}"></a>
                <h5>${titulo}</h5>
                </div>
            `;
            };
        };
        xhr.send();
    };

    procurar.onclick = () => {
        console.log(caixaPesquisa.value);
        executaPesquisa(caixaPesquisa.value);
    };
};
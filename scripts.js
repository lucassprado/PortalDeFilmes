var terminouEm = 0;
var poster;

window.onload = () => {
    function exibeDestaque() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=7b5d0ea5929b85f5afdd83a9afa18458&language=pt-BR&page=1')
        xhr.onload = () => {
            poster = JSON.parse(xhr.responseText)['results'];
    
            for(let i = 0; i < 4; i++) {
                let title = poster[i]['title'];
                let card = poster[i]['poster_path'];
                let id = poster[i]['id'];
        
                let addDestaque = document.getElementById('addDestaque');

                addDestaque.innerHTML += `
                <div class="col-12 col-sm-12 col-md-6 col-lg-3">
                <a href="https://www.themoviedb.org/movie/${id}" target="blank"><img src="https://image.tmdb.org/t/p/w300${card}" alt="${title}"></a>
                </div>
                `;
                terminouEm++;
            };

            let buttonDestaque = document.getElementById('buttonDestaque');

            function carregaDestaque() {
                let continua = terminouEm;
                let para = terminouEm + 4;
                if(terminouEm == 20)
                alert('Carregamento máximo atingido!');
                for (let i = continua; i < para; i++) {
                    let title = poster[i]['title'];
                    let card = poster[i]['poster_path'];
                    let id = poster[i]['id'];
                    
                    addDestaque.innerHTML += `
                        <div class="col-12 col-sm-12 col-md-6 col-lg-3">
                        <a href="https://www.themoviedb.org/movie/${id}" target="blank"><img src="https://image.tmdb.org/t/p/w300${card}" alt="${title}"></a>
                        </div>
                    `;
                    terminouEm++;
                };
            };

            buttonDestaque.onclick = () => {
                carregaDestaque();
            };
        };
        xhr.send();

        
    };
    
    function exibeLancamentos() {
        xhr = new XMLHttpRequest;
        xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=7b5d0ea5929b85f5afdd83a9afa18458&language=pt-BR&page=1')
        xhr.onload = () => {
            let dados = JSON.parse(xhr.responseText)['results'];

            let i = 0;

            var loop = setInterval( () => {
                let titulo = dados[i]['title'];
                let sinopse = dados[i]['overview'];
                let avaliacao = dados[i]['vote_average'];
                let id = dados[i]['id'];
                let estreia = dados[i]['release_date'];
                
                xhr.open('GET', `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7b5d0ea5929b85f5afdd83a9afa18458&language=pt-BR`)
                xhr.onload = () => {
                    setTimeout(()=>{
                        let dados2 = JSON.parse(xhr.responseText)['results'];

                        let trailer = dados2[0]['key'];

                        let addLancamentos = document.getElementById('addLancamentos');

                        addLancamentos.innerHTML += `
                            <div class="carousel-item">
                                <div id="addLancamentos" class="row">
                                    <div class="col-12 col-sm-12 col-md-6 trailer">
                                        <iframe width="100%" height="100%"
                                            src="https://www.youtube-nocookie.com/embed/${trailer}"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen></iframe>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 lancamento-texto">
                                        <h3>${titulo}</h3>
                                        <p>Sinopse: ${sinopse}</p>
                                        <h6 class="h6">Diretor: Joss Whedon</h6>
                                        <h6 class="h6">Roteiro: Joss Whedon</h6>
                                        <h6 class="h6">Estreia: ${estreia}</h6>
                                        <h6 class="h6 texto-avaliacao">Avaliação:</h6>
                                        <div class="avaliacao-estrelas">
                                            <p>${avaliacao}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }, 25);
                    i++;
                    
                    if (i == 20)
                        clearInterval(loop);
                };
                xhr.send();
            }, 100);    
        };
        xhr.send();
    };    

    exibeDestaque();
    exibeLancamentos();
};


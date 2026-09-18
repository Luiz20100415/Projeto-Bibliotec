
const livros = document.querySelectorAll(".livro");

const botaoAnterior = document.getElementById("pagina-anterior");
const botaoProxima = document.getElementById("proxima-pagina");
const numeroPagina = document.querySelector(".pagina-atual");
const quantidadeLivros = document.querySelector(".quantidade-livros");

//* Configuração da paginação

// define quantos livros serão mostrados em cada página
const livrosPorPagina = 4;

// Guarda qual pagina está sendo exibida, começando na pagina 1
let paginaAtual = 1;

//* Calculando total de pagina

// Divide a quantidade total de livros pela quantidade de livros por página
// Math.ceil() -> arredonda o resultado para cima

// exemplo:
// 10 livros / 4 por paginas = 2.5
// Math.ceil() = 2.5 arredonda para cima -> 3 páginas
const totalPaginas = Math.ceil(livros.length / livrosPorPagina);

//* Função responsavel por mostrar a pagina ( atualizar os elementos)

function mostrarPagina() {

    // descobre o indice do primeiro livro que deve aparecer

    // Página 1:
    // (1 - 1) * 4 = 0

    // Página 2:
    // (2 - 1) * 4 = 4

    // livros = [1, 2, 3, 4, 5, 6, 7, 8]
    // Página 1 = 1, 2, 3, 4
    // Página 2 = 5, 6, 7, 8
    const inicio = (paginaAtual - 1) * livrosPorPagina;

    // Descobre até onde os livros devem ser exibidos

    // Página 1 = inicio 0 -> fim = 0 + 4 = 4
    // Página 2 = inicio 4 -> fim = 4 + 4 = 8
    const fim = inicio + livrosPorPagina;

    // Percorre toda lista de livros encontrados no HTML
    // "livro" representa o elemento atual
    // "posicao" representa a posição desse livro na lista 
    livros.forEach((livro, posicao) => {
    //   inicio na pagina 1 = 0 
    // fim = 4

    if(posicao >= inicio && posicao < fim) {
        // se estiver dentro do intervalo, mostra o livro
        livro.style.display = "grid";
    }
    else {
        // se não estiver, esconde o livro
        livro.style.display = "none";   
    }
    })

    // Atualizando no HTML o numero da pagina atual
    numeroPagina.textContent = paginaAtual;

    // Inicialmente considerando o "fim" como a posicao do ultimo livro mostrado
    let ultimoLivro = fim;

    if(ultimoLivro > livros.length) {
        ultimoLivro = livros.length;
    }

    quantidadeLivros.textContent = `Mostrando ${ultimoLivro} de ${livros.length} livros`
};

// evento de click no botão de proxima página

botaoProxima.addEventListener("click", () => {

    // Só permite avançar se ainda existir uma proxima página
    if(paginaAtual < totalPaginas) {

        // Avança uma página
        // paginaAtual = paginaAtual + 1
        paginaAtual++;

        // Atualiza os livros exibidos na tela
        mostrarPagina();
    }
})

// evento de click no botão de página anterior

botaoAnterior.addEventListener("click", () => {

    // Só permite voltar se não estivermos na primeira pagina
    if(paginaAtual > 1) {

        // Voltamos uma pagina
        paginaAtual--;

        // Atualiza os livros exibidos na tela
        mostrarPagina();
    }

})

// Quando a pagina carregar, precisamos executar a função de mostrar página uma vez para esconder os livros que não pertencem a 

import {
    html
} from "lit-html";

var arquivoBlob = '';

function lerArquivo() {
    arquivoBlob = URL.createObjectURL(this.files[0]);
    if (arquivoBlob) {
        document.dispatchEvent(new CustomEvent('imagem-lida'));
    }
}

function revoke() {
    URL.revokeObjectURL(this.src);
}

function enviar(event) {
    event.preventDefault();
    fetch('https://reqres.in/api/users', {
            method: 'post',
            body: JSON.stringify({
                "name": "morpheus",
                "job": "leader"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            document.dispatchEvent(new CustomEvent('enviado', {
                detail: true
            }))
        })
        .catch(reason => {
            document.dispatchEvent(new CustomEvent('enviado', {
                detail: false
            }))
        });
}

const carregar = novamente => html`
<label class="carregar">
    <svg class="carregar__icone" style="display: block;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40"><defs><path id="a" d="M.059.04h39.157V40H.059z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><path fill="currentColor" d="M39.216 20c0 11.047-8.778 20-19.608 20S0 31.047 0 20 8.777 0 19.608 0c10.83 0 19.608 8.953 19.608 20z" mask="url(#b)"/><path stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M19.608 10.4v20M29.804 20H10.196"/></g></svg>
    <span>${novamente ? 'CARREGAR MAIS' : 'CARREGAR FOTO'}</span>
    <input @change=${lerArquivo} type="file" accept="image/*" style="display: none;">
</label>`;

function doneTemplate(sucesso) {
    return html`
    <div class="home">
        <header class="resposta">
        <div class="checkmark-circle">
            <div class="background"></div>
            <div class="checkmark draw"></div>
        </div>
        <h1>MUITO OBRIGADO!</h1>
        <hr>
        <p>A imagem foi enviada com sucesso!</p>
        </header>
        ${carregar(true)}
        <a href="/" class="btn decorado">Início</a>
    <div>
    `
}

const isBackspace = key => key === 'Backspace' || key === 8;

const inputInsta = function () {
    if (!this.value.startsWith('@')) this.value = `@${this.value}`;
};
const preventFirst = function (e) {
    const key = e.key || e.code ? e.key || e.code : e.which || e.keyCode;
    if (this.value.length < 2 && isBackspace(key)) e.preventDefault();
};

const preventSelection = function (e) {
    this.selectionStart = this.selectionEnd;
    this.value = this.value;
};

function sendTemplate() {
    return html`
    <div class="home">
        <header class="preview">
            <img src="${arquivoBlob}" @load=${revoke}>
        </header>
        <div class="baixo">
            <form class="form-envio" @submit=${enviar}>
                <label for="descricao">Descrição</label>
                <textarea rows="5" id="descricao" name="descricao" spellcheck placeholder="Conte um pouco sobre a foto. Dicas: Quando foi feita? Onde foi feita? O que você gostaria que todos vissem nela? Por que ela é tão legal?" required></textarea>
                <label for="nome">Como você quer ser chamado?</label>
                <input type="text" id="nome" name="nome" required>
                <label for="instagram">Instagram</label>
                <input pattern="(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)" @focus=${preventSelection} @keyup=${inputInsta} @keydown=${preventFirst} type="text" id="instagram" name="instagram" required value="@">
                <a class="btn btn-form" href="/">Cancelar</a><button class="btn btn-form decorado" type="submit">Enviar</button>
            </form>
        </div>
    </div>
    `;
}

function greetingTemplate(CONFIG) {
    return html`
    <div class="escondivel home">
        <header class="logo-cliente"></header>
        <div class="baixo unselectable">
            <p class="texto-intro">
                Bem vindo ao Blogueiros <b id="cliente">${CONFIG.cliente}</b>.
                <br>
                Utilize essa plataforma para compartilhar seus momentos!
            </p>
            ${carregar()}
            <a class="como-funciona" href="/como-funciona">como funciona?</a>
        </div>
        <a class="ranking" href="/ranking">
            <svg style="display: block;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><g fill="none" fill-rule="evenodd"><path fill="#FFAC00" fill-rule="nonzero" d="M60 0v60H0z"/><path d="M27 27h30v30H27z"/><path fill="#FFF" fill-rule="nonzero" d="M41.987 29.5c-6.9 0-12.487 5.6-12.487 12.5s5.587 12.5 12.487 12.5C48.9 54.5 54.5 48.9 54.5 42s-5.6-12.5-12.512-12.5zm5.3 20L42 46.312 36.712 49.5l1.4-6.012-4.662-4.038 6.15-.525L42 33.25l2.4 5.662 6.15.526-4.663 4.037 1.4 6.025z"/></g></svg>
        </a>
    </div>`
}

export {
    greetingTemplate,
    sendTemplate,
    doneTemplate
};
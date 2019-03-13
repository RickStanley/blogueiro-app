import {
    html
} from "lit-html";
import {
    repeat
} from "lit-html/directives/repeat";
const listas = [{
        endpoint: '/quantidade',
        nome: 'Quantidade de fotos',
        pessoas: [{
                nome: 'Luciana Romão',
                total: 123
            },
            {
                nome: 'Rick Stanley',
                total: 69
            },
            {
                nome: 'Luiz Junior',
                total: 99
            }
        ]
    },
    {
        endpoint: '/engajamento',
        nome: 'Engajamento redes sociais',
        pessoas: [{
                nome: 'Luciana Romão',
                total: 123
            },
            {
                nome: 'Rick Stanley',
                total: 69
            },
            {
                nome: 'Luiz Junior',
                total: 99
            }
        ]
    },
    {
        endpoint: '/engajamento',
        nome: 'Engajamento redes sociais',
        pessoas: [{
                nome: 'Luciana Romão',
                total: 123
            },
            {
                nome: 'Rick Stanley',
                total: 69
            },
            {
                nome: 'Luiz Junior',
                total: 99
            }
        ]
    },
    {
        endpoint: '/engajamento',
        nome: 'Engajamento redes sociais',
        pessoas: [{
                nome: 'Luciana Romão',
                total: 123
            },
            {
                nome: 'Rick Stanley',
                total: 69
            },
            {
                nome: 'Luiz Junior',
                total: 99
            }
        ]
    },
    {
        endpoint: '/engajamento',
        nome: 'Engajamento redes sociais',
        pessoas: [{
                nome: 'Luciana Romão',
                total: 123
            },
            {
                nome: 'Rick Stanley',
                total: 69
            },
            {
                nome: 'Luiz Junior',
                total: 99
            }
        ]
    }
];

const listaTemplate = lista => html`
    <h3 class="ranking__lista-titulo">${lista.nome}</h3>
    <ol class="ranking__lista">
        ${repeat(lista.pessoas, i => html`
            <li class="item">${i.nome} / ${i.total}</li>
        `)}
    </ol>`;
const listasTemplate = lista => html`
    ${listaTemplate(lista)}
    <a href=${`/ranking${lista.endpoint}`} class="ranking__ver-mais">
        <svg style="display: block;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><g fill="none" fill-rule="evenodd"><path fill="#A3A3A3" d="M25 12.5C25 19.404 19.404 25 12.5 25S0 19.404 0 12.5 5.596 0 12.5 0 25 5.596 25 12.5z"/><path fill="#FFF" d="M6 12.539a1.494 1.494 0 0 1 .455-1.089A1.589 1.589 0 0 1 7.584 11c.222 0 .429.04.621.121.192.082.36.191.504.329a1.49 1.49 0 0 1 .459 1.089c0 .216-.04.418-.121.607a1.477 1.477 0 0 1-.338.491 1.58 1.58 0 0 1-.504.324 1.634 1.634 0 0 1-.621.117c-.228 0-.438-.039-.63-.117a1.511 1.511 0 0 1-.832-.815A1.526 1.526 0 0 1 6 12.54zm9.936 0a1.494 1.494 0 0 1 .454-1.089 1.589 1.589 0 0 1 1.13-.45c.222 0 .429.04.621.121.192.082.36.191.504.329a1.49 1.49 0 0 1 .459 1.089c0 .216-.04.418-.121.607a1.477 1.477 0 0 1-.338.491 1.58 1.58 0 0 1-.504.324 1.634 1.634 0 0 1-.621.117c-.228 0-.438-.039-.63-.117a1.511 1.511 0 0 1-.832-.815 1.526 1.526 0 0 1-.122-.607zm-4.968 0a1.494 1.494 0 0 1 .454-1.089 1.589 1.589 0 0 1 1.13-.45c.222 0 .429.04.621.121.192.082.36.191.504.329a1.49 1.49 0 0 1 .459 1.089c0 .216-.04.418-.121.607a1.477 1.477 0 0 1-.338.491 1.58 1.58 0 0 1-.504.324 1.634 1.634 0 0 1-.621.117c-.228 0-.438-.039-.63-.117a1.511 1.511 0 0 1-.833-.815 1.526 1.526 0 0 1-.121-.607z"/></g></svg>
    </a>`;
const listagemListasTemplate = listas => html`
    <p class="ranking__texto-intro">Donec non nibh at dui egestas dignissim nam tempor</p>
    ${repeat(listas, listasTemplate)}`;

function rankingTemplate(request) {
    return html`
    <svg class="ranking__estrelao" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67"><g fill="none" fill-rule="evenodd"><path d="M-7-7h80v80H-7z"/><path fill="#FFAC00" fill-rule="nonzero" d="M33.359.059c-18.4 0-33.3 14.933-33.3 33.333s14.9 33.333 33.3 33.333c18.433 0 33.366-14.933 33.366-33.333S51.792.06 33.36.06zm14.133 53.333l-14.1-8.5-14.1 8.5 3.733-16.033-12.433-10.767 16.4-1.4 6.4-15.133 6.4 15.1 16.4 1.4L43.76 37.325l3.733 16.067z"/></g></svg>
    <h2 class="ranking__titulo--principal">RANKING</h2>
    <div class="ranking__embrulho">
        ${request
        ? listaTemplate(listas[1])
        : listagemListasTemplate(listas)}
    </div>`
}

export default rankingTemplate;
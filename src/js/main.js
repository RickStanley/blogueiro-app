import {
    render
} from "lit-html";
import {
    browserRouter
} from "prouter";
import {
    greetingTemplate,
    sendTemplate
} from "./home";
import {
    isApplicationPath
} from "./routerUtils";
import comoFuncionaTemplate from "./como-funciona";
import rankingTemplate from "./ranking";

function pronto(f) {
    /in/.test(document.readyState) ? setTimeout(pronto, 5, f) : f();
}

function é(criterio, contexto) {
    return (contexto || document).querySelector(criterio);
}

function são(criterio, contexto) {
    return (contexto || document).querySelectorAll(criterio);
}

pronto(() => {
    const corTema = getComputedStyle(document.documentElement).getPropertyValue('--cor-tema');
    if (corTema) {
        const colorThemeMeta = document.createElement('meta');
        colorThemeMeta.setAttribute('name', 'theme-color');
        colorThemeMeta.setAttribute('content', corTema);
        document.head.appendChild(colorThemeMeta);
    }
    const CONFIG = {
        cliente: 'Fermen.to'
    };
    const montador = é('#montador-principal'),
        lateral = é('#lateral'),
        montadorLateral = é('[data-role=montador-lateral]', lateral),
        router = browserRouter();
    const resetAny = () => {
        for (const aberto of são('[aberto]')) aberto.removeAttribute('aberto');
        montador.classList.remove('empurrar');
    };
    router
        .use('/', (req, resp) => {
            render(greetingTemplate(CONFIG), montador);
            resetAny();
            resp.end();
        })
        .use('/enviar', (req, resp) => {
            render(sendTemplate(), montador);
            resp.end();
        })
        .use('/como-funciona', (req, resp) => {
            montador.classList.add('empurrar');
            lateral.toggleAttribute('aberto');
            render(comoFuncionaTemplate(), montadorLateral);
            resp.end();
        })
        .use('/ranking', (req, resp) => {
            montador.classList.add('empurrar');
            lateral.toggleAttribute('aberto');
            render(rankingTemplate(), montadorLateral);
            resp.end();
        })
        .use('/ranking/teste', (req, resp) => {
            resp.end();
        })
    router.listen();

    document.addEventListener('imagem-lida', (event) => {
        router.push('/enviar');
    })
    // Manipulando links internos
    document.body.addEventListener('click', (evt) => {
        const target = evt.target;
        let link;
        if (target.nodeName === 'A') {
            link = target;
        } else {
            link = target.closest('a');
            if (!link) return;
        }
        const url = link.getAttribute('href');
        if (!isApplicationPath(url)) return;
        evt.preventDefault();
        router.push(url);
    });
});
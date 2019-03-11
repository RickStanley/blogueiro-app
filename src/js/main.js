import {
    render
} from "lit-html";
import {
    browserRouter
} from "prouter";
import homeTemplate from "./home";
import { isApplicationPath } from "./routerUtils";

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
    const CONFIG = {
        cliente: 'Fermen.to'
    };
    const montador = é('[data-role=montador]'),
        comoFunfa = é('[data-role=como-funciona]'),
        ranking = é('[data-role=ranking]'),
        router = browserRouter();
    const resetAny = () => {
        for (const aberto of são('[aberto]')) aberto.removeAttribute('aberto');
        montador.classList.remove('empurrar');
    };
    router
        .use('/', (req, resp) => {
            render(homeTemplate(CONFIG), montador);
            resetAny();
            resp.end();
        })
        .use('/como-funciona', (req, resp) => {
            montador.classList.add('empurrar');
            comoFunfa.toggleAttribute('aberto');
            resp.end();
        })
        .use('/ranking', (req, resp) => {
            montador.classList.add('empurrar');
            ranking.toggleAttribute('aberto');
            resp.end();
        });
    router.listen();

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
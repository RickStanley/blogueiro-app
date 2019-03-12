import {
    render
} from "lit-html";
import {
    browserRouter,
    routerGroup
} from "prouter";
import {
    greetingTemplate,
    sendTemplate,
    doneTemplate
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
        cliente: 'Fermen.to',
        temImg: false
    };
    const montadorPrincipal = é('#montador-principal'),
        lateral = é('#lateral'),
        montadorLateral = é('[data-role=montador-lateral]', lateral),
        router = browserRouter(),
        rankingRouterGroup = routerGroup();
    const resetAny = () => {
        lateral.removeAttribute('aberto');
        CONFIG.temImg = false;
        montadorPrincipal.classList.remove('empurrar');
    };
    const abrirLateral = template => {
        montadorPrincipal.classList.add('empurrar');
        lateral.toggleAttribute('aberto', true);
        render(template(), montadorLateral);
    };
    rankingRouterGroup
        .use('/', (req, resp) => {
            abrirLateral(rankingTemplate);
            resp.end();
        })
        .use('/*', (req, resp) => {
            render(rankingTemplate(req.params), montadorLateral);
            resp.end();
        });
    router
        .use('/', (req, resp, next) => {
            render(greetingTemplate(CONFIG), montadorPrincipal);
            resetAny();
            next();
        })
        .use('/enviar', (req, resp, next) => {
            if (CONFIG.temImg) {
                render(sendTemplate(), montadorPrincipal);
            } else router.push('/');
            next();
        })
        .use('/resposta', (req, resp) => {
            if (CONFIG.temImg) {
                render(doneTemplate(), montadorPrincipal);
            } else router.push('/');
            resp.end();
        })
        .use('/como-funciona', (req, resp) => {
            abrirLateral(comoFuncionaTemplate);
            resp.end();
        })
        .use('/ranking', rankingRouterGroup);
    router.listen();

    document.addEventListener('imagem-lida', (event) => {
        CONFIG.temImg = true;
        router.push('/enviar');
    });
    document.addEventListener('enviado', (event) => {
        router.push('/resposta');
    });
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
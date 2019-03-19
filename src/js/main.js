import * as ENV from "../../env.json";
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
import {
    lockyOn
} from "dom-locky";

function hexParaRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function pronto(f) {
    /in/.test(document.readyState) ? setTimeout(pronto, 5, f) : f();
}

function é(criterio, contexto) {
    return (contexto || document).querySelector(criterio);
}

function são(criterio, contexto) {
    return (contexto || document).querySelectorAll(criterio);
}

function definirCor(corTema) {
    const colorThemeMeta = document.querySelector('[name=theme-color]') || document.createElement('meta'),
        rgb = hexParaRgb(corTema);
    colorThemeMeta.setAttribute('name', 'theme-color');
    colorThemeMeta.setAttribute('content', corTema);
    document.head.appendChild(colorThemeMeta);
    document.documentElement.style.setProperty("--cor-tema", corTema);
    document.documentElement.style.setProperty("--cor-tema-rgb", `${rgb.r},${rgb.g},${rgb.b}`);
}

// Toggle Attribute polifll
if (!Element.prototype.toggleAttribute) {
    Element.prototype.toggleAttribute = function (name, force) {
        if (force !== void 0) force = !!force
        if (this.getAttribute(name) !== null) {
            if (force) return true;
            this.removeAttribute(name);
            return false;
        } else {
            if (force === false) return false;
            this.setAttribute(name, "");
            return true;
        }
    };
}

pronto(() => {
    const CONFIG = {
        cliente: '',
        temImg: false
    };
    definirCor(ENV.COR);
    CONFIG.cliente = ENV.CLIENTE;
    let unlock = null;
    const montadorPrincipal = é('#montador-principal'),
        lateral = é('#lateral'),
        montadorLateral = é('[data-role=montador-lateral]', lateral),
        router = browserRouter(),
        rankingRouterGroup = routerGroup();
    const resetAny = () => {
        lateral.removeAttribute('aberto');
        CONFIG.temImg = false;
        montadorPrincipal.classList.remove('empurrar');
        if (unlock) unlock(), unlock = null;
    };
    const abrirLateral = template => {
        montadorPrincipal.classList.add('empurrar');
        lateral.toggleAttribute('aberto', true);
        render(template(), montadorLateral);
        if (!unlock) unlock = lockyOn(lateral);
    };
    rankingRouterGroup
        .use('/', (req, resp, next) => {
            abrirLateral(rankingTemplate);
            next();
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
        .use('/envio', (req, resp, next) => {
            if (CONFIG.temImg) {
                render(sendTemplate(), montadorPrincipal);
            } else router.push('/');
            next();
        })
        .use('/finalizado', (req, resp) => {
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
        router.push('/envio');
    });
    document.addEventListener('enviado', (event) => {
        router.push('/finalizado');
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
    // Teste para ativar evento :focus ou :hover no iOs
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
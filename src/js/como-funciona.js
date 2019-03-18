import { html } from "lit-html";
import * as ENV from "../../env.json";

function comoFuncionaTemplate() {
    return html`
    <article class="como-funciona__article">
        <h1>Como Funciona</h1>
        <p>${ENV.COMO_FUNCIONA}</p>
    </article>`
}

export default comoFuncionaTemplate;
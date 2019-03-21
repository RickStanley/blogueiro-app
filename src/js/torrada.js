import {
    html
} from "lit-html";
import { classMap } from "lit-html/directives/class-map";
var texto = '';

export default function torradaTemplate(novaConf, visivel) {
    let classes = {
        torrada: true,
        error: false
    };
    texto = novaConf.texto || texto;
    for (const classe in novaConf.classes) {
        if (novaConf.classes.hasOwnProperty(classe)) {
            classes[classe] = novaConf.classes[classe];
        }
    }
    return html`
    <div class=${classMap(classes)} ?visivel=${visivel}>
        <p>${texto}</p>
    </div>`;
}
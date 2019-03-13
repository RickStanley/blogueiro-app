# Blogueiro App
Template de Blogueiro para clientes.

## Como funciona
1. Crie um arquivo `ENV.json` no root com as seguintes chaves:

    - `CLIENTE`: nome que será apresentado na home;
    - `API_HOST`: HOST da API;
    - `COR`: cor tema do cliente;
    - `CLIENTE_SHORT`: nome curto que será usado nas chamadas da API;

        Exemplo:
    ```json
    {
        "CLIENTE": "Fermen.to",
        "API_HOST": "https://blogueirinhos-api.dev.fermen.to",
        "COR": "#f8956c",
        "CLIENTE_SHORT": "FRMNT"
    }
    ```
2. Rode: `npm i` para instalar as dependências.
3. Rode: `npm run build` para construir o app, que resultará na pasta de saída (padrão): `public/`
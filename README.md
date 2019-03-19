# Blogueiro App
Template de Blogueiro para clientes.

## Como funciona
1. Crie um arquivo `ENV.json` no root com as seguintes chaves:

    - `CLIENTE`: nome que será apresentado na home;
    - `API_HOST`: HOST da API;
    - `COR`: cor tema do cliente;
    - `CLIENTE_SHORT`: nome curto que será usado nas chamadas da API;
    - `COMO_FUNCIONA`: políticas de uso específico do cliente;

        Exemplo:
    ```json
    {
        "CLIENTE": "Fermen.to",
        "API_HOST": "https://blogueirinhos-api.dev.fermen.to",
        "COR": "#f8956c",
        "CLIENTE_SHORT": "FRMNT",
        "COMO_FUNCIONA": "Usando Blogueiros Fermen.to, vocês expõe as pessoas."
    }
    ```
2. Coloque as dependências de imagens (fundo e logo) na pasta `src/assets/`, com os respectivos nomes:
    - cliente_fundo: imagem de fundo da home, fallback para a cor tema, preferível que seja jpg;
    - cliente_logo: logo do cliente que será centralizada, perferível q seja png;

    Alternativamente você pode especificar uma URL no `env.json` com as mesmas propriedades, mas com letras maiúsculas.
    A prioridade é a versão estática de uma imagem.
2. Rode: `npm i` para instalar as dependências.
3. Rode: `npm run build` para construir o app, que resultará na pasta de saída (padrão): `public/`
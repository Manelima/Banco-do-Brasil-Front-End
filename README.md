# Banco do Brasil - Frontend

Esse projeto, foi baseado na requisição do nosso Mentor do Banco do Brasil - Rodrigo Silva - para desenvolver um sistemas de linhas de crédito ligando o Frontend ao Backend.
Além do Desenvolvimento de outras Features como: Login, Simulador de Investimentos, Blog e Operações. O Projeto foi convocado para o Demoday, além de ser apresentado no devidamente no Banco do Brasil.

## ❗️ Links Importantes

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Instalação

Rode o projeto utilizando seu package manager preferido. Use qualquer comando para instalar as dependências:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

Após completar a instalação, seu ambiente estará pronto para o Desenvolvimento utilizando Vuetify.

## ✨ Features de Desenvolvimento

- 🖼️ **Front-End Stack**: Utilizando Vue 3 e Vuetify 3 para uma moderna, reativa experiência em Desenvolvimento de UI. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **Gerenciamento de Estado**: Integrado com [Pinia](https://pinia.vuejs.org/), a solução intuitiva e modular de gerenciamento de estado para Vue.
- 🚦 **Roteamento e Layouts**: Utiliza o Vue Router para navegação SPA e o vite-plugin-vue-layouts para organizar layouts de arquivos Vue. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- ⚡ **Ferramentas de Próxima Geração**: Desenvolvido com Vite, experimente inicializações a frio rápidas e HMR (Substituição de Módulo a Quente) instantânea. [Vite](https://vitejs.dev/)
- 🧩 **Importação Automatizada de Componentes**: Simplifique seu fluxo de trabalho com unplugin-vue-components, importando componentes automaticamente conforme você os utiliza. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Uso

Esta seção aborda como iniciar o servidor de desenvolvimento e compilar seu projeto para produção.

### Iniciando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reload, execute o seguinte comando. O servidor estará acessível em [http://localhost:3000](http://localhost:3000):

```bash
yarn dev or npm run dev
```

(Repita para npm, pnpm, and bun com os respectivos comandos.)

> Adicione NODE_OPTIONS='--no-warnings' para suprimir os avisos de importação JSON que ocorrem como parte do mapeamento de importação do Vuetify. Se você estiver usando o Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) ou superior, pode alterar isso para NODE_OPTIONS='--disable-warning=5401'. Se não se importar com o aviso, você pode removê-lo do seu script de desenvolvimento package.json.


### Building para produção

Para "buildar" seu projeto para produção, use:

```bash
yarn build or npm build
```

(Repita para npm, pnpm, and bun com os respectivos comandos.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪  Desenvolvido com Vuetify 

Este projeto foi desenvolvido com [Vuetify](https://vuetifyjs.com/en/), uma biblioteca de interface de usuário com uma coleção abrangente de componentes Vue.

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC

# API Gateway - Marketplace Microservices

## Descrição

Este é o API Gateway para o sistema de microserviços do marketplace, construído com NestJS. Ele serve como ponto de entrada único para todas as requisições dos clientes, roteando-as para os serviços apropriados.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

## Configuração

As configurações estão localizadas em `src/config/gateway.config.ts`. Ajuste conforme necessário para o ambiente.

## Execução

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

## Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run start`: Inicia o servidor
- `npm run start:dev`: Inicia em modo desenvolvimento com watch
- `npm run start:debug`: Inicia em modo debug
- `npm run start:prod`: Inicia em produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes
- `npm run test:watch`: Executa os testes em modo watch
- `npm run test:cov`: Executa os testes com cobertura
- `npm run test:debug`: Executa os testes em modo debug
- `npm run test:e2e`: Executa os testes end-to-end
- `npm run format`: Formata o código com Prettier

## Estrutura do Projeto

- `src/`: Código fonte
  - `app/`: Módulo principal da aplicação
  - `config/`: Configurações do gateway
  - `proxy/`: Módulo responsável pelo proxy das requisições
- `test/`: Arquivos de teste

## Testes

Para executar os testes unitários:

```bash
npm run test
```

Para testes end-to-end:

```bash
npm run test:e2e
```

Para cobertura de testes:

```bash
npm run test:cov
```

## Licença

UNLICENSED
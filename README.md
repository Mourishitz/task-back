# Task Back Maask

## Stack: 
- Hono (Lightweight TypeScript Framework)
- Redis (Armazenamento de dados de sessão e cache em memória)
- Docker (Apenas para rodar o container Redis)
- KnexJS (Querybuilder caso necessário integrar banco de dados SQL)

## Overview

O projeto segue o padrão de um microserviço Hono com pastas distintas e seguindo padrões de design como Singletons.

Para rodar o projeto, utilize o comando
```
  npm run dev
```

E o projeto irá rodar na http://localhost:3000

As rotas do projeto podem ser encontradas em um arquivo YAML padrão insomnia na pasta `specs`.
Juntamente, um arquivo de OpenAPI pode ser encontrado.

## Melhorias possíveis
As melhorias possíveis estão ranqueadas em ordem de importância/prioridade.

1. Utilizar padrão de Repositórios.
- Isso significa, isolar totalmente a lógica de query e interações com serviços de armazenamento como Redis, Supabase e eventualmente um banco de dados SQL.
2. Criar uma lógica de permissões zero-trust
- Como o objetivo do projeto é envolta do uso dos serviços Supabase, a autenticação foi feita através desse serviço. Porém, é muito importante manter uma lógica e controle de usuários para controlar melhor as permissões e os acessos possíveis.
3. Implementar arquitetura de serviços.
- Utilizar classes e interfaces de serviços para que seja possível substituir dependências do código (como provedores de autenticação, drives de armazenamento e conexões de banco de dados por exemplo).
4. Melhorar a arquitetura do sistema e torná-lo DDD (Domain Driven Design)
- Isolar as funcionalidades por domínio e trazer uma arquitetura que corresponda a tal, com tipagens fortes e interfaces que garantem o funcionamento do sistema com depêndencias internas por domínio.

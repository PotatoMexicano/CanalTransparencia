
# 📢 PortalOuvidoria

Sistema de Ouvidoria para classificação e gestão de relatos — ideal para empresas que valorizam transparência e querem ouvir seus colaboradores ou clientes.

---

## ✅ O que é?

O **PortalOuvidoria** é um sistema de ouvidoria corporativa desenvolvido em .NET 9, estruturado com base em Clean Architecture. Seu foco é receber relatos de forma anônima ou identificada e permitir sua categorização e acompanhamento ao longo do tempo.

> 💡 Uma funcionalidade de inteligência artificial para classificação automática dos relatos está em desenvolvimento e será lançada futuramente.

---

## 🚀 Como usar?

### Pré-requisitos
- .NET 9.0 SDK
- Banco de dados configurado (por padrão, InMemory para testes)
- Visual Studio ou VS Code

### Passos para rodar:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/PortalOuvidoria.git
   cd PortalOuvidoria
   ```

2. Restaure os pacotes e compile:
   ```bash
   dotnet restore
   dotnet build
   ```

3. Execute o projeto:
   ```bash
   dotnet run --project PortalOuvidoria.Server
   ```

4. Acesse a aplicação:
   ```
   https://localhost:5001
   ```

---

## 🐳 Usando com Docker

Você pode utilizar o `Dockerfile` incluso no projeto para gerar uma imagem da aplicação:

```bash
docker build -t portalouvidoria .
docker run -d -p 8080:80 --name ouvidoria-app portalouvidoria
```

Isso facilita a implantação em ambientes produtivos ou em servidores de teste com maior agilidade.

---

## 🤔 Por que usar?

- Centraliza todos os relatos de forma segura e estruturada
- Funciona 100% offline (ideal para ambientes internos)
- Flexível para integração com outros sistemas

---

## 🎯 Benefícios

- ✅ Garante o anonimato dos usuários (quando desejado)
- 📈 Facilita a tomada de decisão com relatórios claros
- 🏗️ Arquitetura modular e sustentável (Clean Architecture)
- 🔒 Suporte a múltiplas empresas (multi-tenant)

---

Feito com 💙 por quem acredita em ambientes mais transparentes.

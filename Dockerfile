# Build do front-end
FROM node:20 AS frontend
WORKDIR /app
COPY PortalOuvidoria.Client/package*.json ./
RUN npm install --force
COPY PortalOuvidoria.Client ./
RUN npm run build

# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia os arquivos do projeto e restaura as dependências
COPY PortalOuvidoria.sln ./
COPY PortalOuvidoria.Application/PortalOuvidoria.Application.csproj PortalOuvidoria.Application/
COPY PortalOuvidoria.Client/PortalOuvidoria.WebClient.esproj PortalOuvidoria.Client/
COPY PortalOuvidoria.Domain/PortalOuvidoria.Domain.csproj PortalOuvidoria.Domain/
COPY PortalOuvidoria.Infra.Data/PortalOuvidoria.Infra.Data.csproj PortalOuvidoria.Infra.Data/
COPY PortalOuvidoria.Server/PortalOuvidoria.WebServer.csproj PortalOuvidoria.Server/

RUN dotnet restore PortalOuvidoria.sln

# Copia o restante dos arquivos e publica a aplicação
COPY . ./
RUN dotnet publish PortalOuvidoria.Server/PortalOuvidoria.WebServer.csproj -c Release -o out

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# Copia os arquivos estáticos do front para o wwwroot
COPY --from=frontend /app/dist ./wwwroot

# Expõe a porta usada pela aplicação
EXPOSE 5299

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ConnectionStrings__ApplicationConnection=""

# Comando para iniciar a aplicação
ENTRYPOINT ["dotnet", "PortalOuvidoria.WebServer.dll"]

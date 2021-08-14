# nome da imagem, no caso: node
FROM node
#cria um diretório dentro da pasta usr do git
WORKDIR /usr/app
# Copia o package da raiz do projetopara /usr/app 
COPY package.json ./
#Instala as dependências do projeto
RUN npm install
#Copia os arquivos da raiz do projeto para /usr/app 
COPY . .
#Porta a ser utilizada pelo container
EXPOSE 3333
#Adiciona o script de inicialização
CMD ["npm","run","dev"]
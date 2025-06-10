# Použijte oficiální Node.js obraz jako základ
FROM node:14

# Nastavte pracovní adresář
WORKDIR /app

# Zkopírujte package.json a package-lock.json
COPY package*.json ./

# Nainstalujte závislosti
RUN npm install

# Zkopírujte zbytek aplikace
COPY . .

# Exponujte port, na kterém aplikace běží
EXPOSE 3000

# Definujte příkaz pro spuštění aplikace
CMD ["npm", "start"]

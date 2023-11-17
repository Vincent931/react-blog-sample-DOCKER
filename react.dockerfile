# Base image
FROM node:21.1.0

# Set the working directory inside the container
WORKDIR /var/www/html/assets

COPY . /var/www/html/assets/

RUN npm install -g npm@10.2.3

#add
RUN chown -R node:node /var/www/html/assets/
#add
USER node
#add
#COPY --chown=node:node . .
#RUN npm run build

# Set the command to run for the asset service
#CMD ["npm", "build"]
RUN npm run-script build
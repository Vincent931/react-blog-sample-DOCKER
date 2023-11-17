#on customise cette image; l'image officielle du serveur apache sous ubuntu
FROM ubuntu/apache2:latest

#variables d'environnement
ENV APACHE_RUN_USER=symfony
ENV APACHE_RUN_GROUP=symfony

#créer notre dossier de code serveur
RUN mkdir -p /var/www/html/public

#on ajoute un fichier de configuration pour qu'apache nous serve les bons fichiers
#COPY /etc/apache2/apache2.conf /etc/apache2/sites-available/html.conf
RUN echo "ServerName html" >> /etc/apache2/sites-available/html.conf

#on active le virtual host: notre application symfony sera accessible grace a ces lignes
RUN a2ensite html.conf

#on active divers module d'apache nécessaire au fonctionnement de symfony
RUN a2enmod rewrite actions alias proxy_fcgi setenvif

RUN cat /etc/apache2/envvars

RUN sed -i "s/www-data/${APACHE_RUN_USER}/g" /etc/apache2/envvars

RUN cat /etc/apache2/envvars

RUN groupadd ${APACHE_RUN_GROUP}

RUN useradd -g ${APACHE_RUN_GROUP} ${APACHE_RUN_USER}
#FROM php:8.1-fpm

#ENV PHPUSER=symfony
#ENV PHPGROUP=symfony

#ENV UID=1000
#ENV GID=1000
#NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
#en production doit disparaitre
#RUN chown -R www-data:www-data /var/www/html

#RUN addgroup --gid 1006 --system symfony
#RUN adduser --group www-data --System --shell /bin/sh --uid 1006 symfony --debug --verbose

#RUN mkdir -p /var/www/html/public
#add packages for symfony
#RUN docker-php-ext-install pdo pdo_mysql

#CMD ["php"]

#NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
#en production doit disparaitre
#USER www-data
################End PHP8.1

FROM php:8.2-cli

ENV PHPUSER=symfony
ENV PHPGROUP=symfony

ENV UID=1000
ENV GID=1000
#NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
#en production doit disparaitre
RUN chown -R www-data:www-data /var/www/html

RUN addgroup --gid 1006 --system symfony
#RUN adduser --group www-data --System --shell /bin/sh --uid 1006 symfony --debug --verbose

RUN mkdir -p /var/www/html/public
#add packages for symfony
RUN docker-php-ext-install pdo pdo_mysql

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
#CMD ["php", "-S", "0.0.0.0:8000"]
#Maintenant, ouvrez votre navigateur et accédez à l'adresse http://0.0.0.0:8000/. Vous devriez voir le message "Hello World !" s'afficher.
CMD ["php"]
#NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
#en production doit disparaitre
USER www-data



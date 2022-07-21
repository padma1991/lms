FROM nginx:alpine

LABEL author="lms"

COPY ./www /usr/share/nginx/html

COPY ./nginxconf /etc/nginx/conf.d

EXPOSE 80 443

ENTRYPOINT ["nginx","-g","daemon off;"]

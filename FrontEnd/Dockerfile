FROM nginx

RUN mkdir /app

WORKDIR /app

# 경로 이동
RUN mkdir ./build

ADD ./build ./build

# 있는것 일단 지우고 새로 정의하기
RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

# 80포트 열어두기
EXPOSE 80 


CMD ["nginx", "-g", "daemon off;"]
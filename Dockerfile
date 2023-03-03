FROM openjdk:11-jre-slim
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY ./build/libs/blueIsland-0.0.1-SNAPSHOT.jar /usr/local/blueIsland-0.0.1-SNAPSHOT.jar
RUN chmod +x /usr/local/blueIsland-0.0.1-SNAPSHOT.jar
WORKDIR /usr/local
ENTRYPOINT ["java", "-jar", "blueIsland-0.0.1-SNAPSHOT.jar"]
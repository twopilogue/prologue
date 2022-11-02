FROM openjdk:8-jdk

WORKDIR /backend

COPY ./build/libs/prologue-0.0.1-SNAPSHOT.jar prologue-server.jar

ENTRYPOINT ["java", "-jar", "prologue-server.jar"]

EXPOSE 8080

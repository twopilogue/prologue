FROM openjdk:8-jdk

WORKDIR /backend/prologue

COPY ./build/libs/prologue-0.0.1-SNAPSHOT.jar prologue-server.jar

ENTRYPOINT ["java", "-jar", "prologue-server.jar"]
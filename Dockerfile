FROM openjdk:19-jdk-alpine
COPY ./target/litwago-0.0.1-SNAPSHOT.jar app.jar
COPY ./src/main/resources/fonts /fonts
ENTRYPOINT ["java", "-jar", "/app.jar"]

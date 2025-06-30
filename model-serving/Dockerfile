# model-serving/Dockerfile
FROM maven:3.9-amazoncorretto-21-al2023

WORKDIR /app

COPY target/model-serving-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
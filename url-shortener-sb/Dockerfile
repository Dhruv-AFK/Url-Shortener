# Use a Maven image with Java 23 to build the Spring Boot app
FROM maven:3.9-eclipse-temurin-23 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use a Java 23 runtime image to run the application
FROM eclipse-temurin:23-jre

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

#Expose port 8080
EXPOSE 8080

#Specify the command to run the application
ENTRYPOINT ["java","-jar","/app/app.jar"]
FROM openjdk:8-jre-alpine
ENV PROFILE=prod
ADD WEB-INF /WEB-INF
ADD *.jar /WEB-INF/app.jar
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=$PROFILE -jar /WEB-INF/app.jar
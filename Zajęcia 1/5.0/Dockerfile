FROM ubuntu:24.04

# Instalacja Javy 8, sqlite3, curl i unzip
RUN apt-get update && apt-get install -y software-properties-common && \
    add-apt-repository ppa:openjdk-r/ppa && \
    apt-get update && \
    apt-get install -y openjdk-8-jdk curl unzip sqlite3 && \
    rm -rf /var/lib/apt/lists/*

# Instalacja Kotlina
RUN curl -L https://github.com/JetBrains/kotlin/releases/download/v1.9.23/kotlin-compiler-1.9.23.zip -o kotlin.zip && \
    unzip kotlin.zip -d /opt && \
    rm kotlin.zip

# Instalacja Gradle
RUN curl -L https://services.gradle.org/distributions/gradle-7.6.4-bin.zip -o gradle.zip && \
    unzip gradle.zip -d /opt && \
    rm gradle.zip

# Ustawienie ścieżek PATH dla Kotlina i Gradle
ENV PATH="${PATH}:/opt/kotlinc/bin:/opt/gradle-7.6.4/bin"

WORKDIR /app

COPY build.gradle /app/

RUN gradle dependencies --no-daemon

COPY /src /app/src

RUN gradle build --no-daemon

CMD ["gradle", "run", "--no-daemon", "--quiet"]
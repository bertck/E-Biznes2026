FROM ubuntu:24.04

# Instalacja Javy 8
RUN apt-get update && apt-get install -y software-properties-common && \
    add-apt-repository ppa:openjdk-r/ppa && \
    apt-get update && \
    apt-get install -y openjdk-8-jdk curl unzip && \
    rm -rf /var/lib/apt/lists/*

# Instalacja Kotlina
RUN curl -L https://github.com/JetBrains/kotlin/releases/download/v1.9.23/kotlin-compiler-1.9.23.zip -o kotlin.zip && \
    unzip kotlin.zip -d /opt && \
    rm kotlin.zip

# Ustawienie ścieżki PATH dla Kotlina
ENV PATH="${PATH}:/opt/kotlinc/bin"

CMD ["sh", "-c", "java -version && kotlinc -version"]
FROM golang:1.27-alpine

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY main.go ./

RUN go build -o server .

RUN adduser -D -g '' appuser
USER appuser

EXPOSE 8080

CMD ["./server"]
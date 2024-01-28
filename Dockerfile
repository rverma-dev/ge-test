FROM golang:1.21 AS builder
ENV K6_VERSION=v0.48.0
ENV XK6_VERSION=v0.10.0
RUN apk add --no-cache build-base git
RUN CGO_ENABLED=1 go install go.k6.io/xk6/cmd/xk6@${XK6_VERSION} && xk6 build ${K6_VERSION} --with github.com/grafana/xk6-sql --with github.com/grafana/xk6-output-prometheus-remote@latest

FROM grafana/k6:0.48.0
COPY k6 /bin/runner
WORKDIR /home/k6
COPY --from=builder /go/k6 /usr/bin/k6
ENTRYPOINT ["/bin/runner"]

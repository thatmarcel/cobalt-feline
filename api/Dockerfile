FROM almalinux:10 AS build

RUN dnf install -y unzip make gcc gcc-c++ && curl -fsSL https://bun.sh/install | bash
ENV PATH="$PATH:/root/.bun/bin"

WORKDIR /app

COPY . .

RUN bun install

FROM almalinux:10 AS runtime

RUN dnf install -y unzip && curl -fsSL https://bun.sh/install | bash
ENV PATH="$PATH:/root/.bun/bin"

COPY --from=build /app /app

WORKDIR /app/api

ENTRYPOINT ["bun", "start"]

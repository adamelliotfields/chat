FROM mcr.microsoft.com/devcontainers/typescript-node:20

# add bun bin to path
ENV PATH "/home/node/.bun/bin:${PATH}"

# set node user/group
USER 1000:1000

# install bun v1.0.23
RUN curl -fsSL https://bun.sh/install | bash -s 'bun-v1.0.23'

# workdir
WORKDIR /workspaces/chat

# ports
EXPOSE 5173

FROM mcr.microsoft.com/playwright:v1.45.2-jammy

RUN mkdir /opt/playwright-tests

WORKDIR /opt/playwright-tests

COPY . .

RUN npm ci

CMD ["npm", "run", "test:getCarsAPI"]


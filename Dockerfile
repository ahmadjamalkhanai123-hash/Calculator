FROM python:3.10

WORKDIR /app

COPY . .

RUN echo "CI Build Running"

CMD ["python", "--version"]

# Jak uruchomić
- zbuduj bazę danych najlepiej w Postgres np. `CREATE DATABASE wsb`
- stwórz plik `.env` tam gdzie znajduje się plik, który właśnie czytasz
- wpisz wartość do zmiennej `DATABASE_URL` i insiruj się plikiem `.env.template` przy wpisywaniu wartości
- W konsoli wpisz komendę `npm install`
- Następnie `npm start`
- By sprawdzić czy wszystko działa wejdź na adres URL `http://localhost:8000/v1/sky/1`
# E-Biznes2026

[Link do obrazów](https://hub.docker.com/repositories/bart0lomeo)

Zadanie 1 Docker

✅ 3.0 Obraz ubuntu z Pythonem w wersji 3.10 [Link do commita](https://github.com/bertck/E-Biznes2026/commit/3f3ebe90fb167383713dd3687aa100a7903e875e)

✅ 3.5 Obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem [Link do commita](https://github.com/bertck/E-Biznes2026/commit/f0b4cf68cff3fa7ceefff4b21eb646160115f3a9)

✅ 4.0 Do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/0d89d4ba7f75473a099bfd124a166967bc4cad28)

✅ 4.5 Stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle [Link do commita](https://github.com/bertck/E-Biznes2026/commit/de84ea70464c519bb65b20962cb2072943709908)

✅ 5.0 Dodać konfigurację docker-compose [Link do commita](https://github.com/bertck/E-Biznes2026/commit/8142f1e95d90b2c51834fcb826aee326a0ed3c02)


Zadanie 2 Scala

✅ 3.0 Należy stworzyć kontroler do Produktów [Link do commita](https://github.com/bertck/E-Biznes2026/commit/e69d8555d6c8aafae247b43879cfdcd8c3b0febc)

✅ 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [Link do commita](https://github.com/bertck/E-Biznes2026/commit/942a3c77994c63dcd065fab93e8718d6433d3886)

✅ 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD [Link do commita](https://github.com/bertck/E-Biznes2026/commit/506d7c240aee516d10516ad647dddbd769ad2dad)

❌ 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok

❌ 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD


Zadanie 3 Kotlin

✅ 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord [Link do commita](https://github.com/bertck/E-Biznes2026/commit/471481871bb1826029c1c61db5fd27dc25d468c1)

✅ 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/2beb6965f20f0f52f3c5006416b49ab1cdaee1e5)

❌ 4.0 Zwróci listę kategorii na określone żądanie użytkownika

❌ 4.5 Zwróci listę produktów wg żądanej kategorii

❌ 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack lub Messenger


Zadanie 4 Go

✅ 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [Link do commita](https://github.com/bertck/E-Biznes2026/commit/78f2cf99e3c154d8d6c12e81900e97600f640516)

✅ 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/155a91a0c25d7dfe42bf05125154dd8cd59098f8)

✅ 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Link do commita](https://github.com/bertck/E-Biznes2026/commit/73df2c10a1988f456ccb6ca91e34aae853d19bdf)

✅ 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem [Link do commita](https://github.com/bertck/E-Biznes2026/commit/5d7273c2f2cb745b57e5d1a2ba5034e7211cea5b)

❌ 5.0 pogrupować zapytania w gorm’owe scope'y


Zadanie 5 Frontend

✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej [Link do commita](https://github.com/bertck/E-Biznes2026/commit/3c948022287c4e5ad1836ae84881ba1a9887b381)

✅ 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Link do commita](https://github.com/bertck/E-Biznes2026/commit/fd9f2ea8bd91e69b3fb680d746c38a2720987e86)

✅ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks [Link do commita](https://github.com/bertck/E-Biznes2026/commit/1eaf00c98c1451a5b36a15fbf361d564fbe6cbfe)

✅ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose [Link do commita](https://github.com/bertck/E-Biznes2026/commit/fffa75bbcfae08a0502ac1e537bfaefd2fa703f6)

❌ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS


Zadanie 6 Testy

✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/9e410b5248af42816bf34496d7fff0d477a63888)

✅ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji [Link do commita](https://github.com/bertck/E-Biznes2026/commit/c2a202f04a21e6cea46f7cc661fc707922f0e4d3)

❌ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami

❌ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint

❌ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku


Zadanie 7 Sonar

✅ 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita [Link do commita](https://github.com/bertck/E-Biznes2026/commit/e707bfe9680a83b6e18c8f1140cdb6f91f390432)

✅ 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/221a6f653ae5d5f5d0f2d784af212e10bce3fb9d)

✅ 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej)[Link do commita](https://github.com/bertck/E-Biznes2026/commit/221a6f653ae5d5f5d0f2d784af212e10bce3fb9d)

✅ 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/221a6f653ae5d5f5d0f2d784af212e10bce3fb9d)

❌ 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej


Zadanie 8 OAuth2

✅ 3.0 logowanie przez aplikację serwerową (bez Oauth2) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/214c5fb705dd61e894cc11ff238d9fb2be34b8dc)

✅ 3.5 rejestracja przez aplikację serwerową (bez Oauth2) [Link do commita](https://github.com/bertck/E-Biznes2026/commit/214c5fb705dd61e894cc11ff238d9fb2be34b8dc)

✅ 4.0 logowanie via Google OAuth2 [Link do commita](https://github.com/bertck/E-Biznes2026/commit/deb8ff5ac3ee6c1b1da9337f68bcd8fc012b3c3c)

❌ 4.5 logowanie via Facebook lub Github OAuth2

❌ 5.0 zapisywanie danych logowania OAuth2 po stronie serwera


Zadanie 9 GPT

✅ 3.0 należy stworzyć po stronie serwerowej osobny serwis do łącznia z chatGPT [Link do commita](https://github.com/bertck/E-Biznes2026/commit/0f322e5a86dc5c89de240834f4b1f622a37b8037)

❌ 3.5 należy połączyć serwis z interfejsem frontendowym via serwis w Kotlinie (zadanie 3) - discord + JS

❌ 4.0 stworzyć listę 5 różnych otwarć oraz zamknięć rozmowy

❌ 4.5 filtrowanie po zagadnieniach związanych ze sklepem (np. ograniczenie się jedynie do ubrań oraz samego sklepu) do GPT

❌ 5.0 filtrowanie odpowiedzi po sentymencie


Zadanie 10 CI/CD

✅ 3.0 Należy stworzyć odpowiednie instancje po stronie chmury na dockerze [Link do commita](https://github.com/bertck/E-Biznes2026/commit/828d6c91e09306365dcb34afffb540f17b9afe0f)

[Link do strony z aplikacją](https://zadanie10-frontend-bl.azurewebsites.net/)

❌ 3.5 Stworzyć odpowiedni pipeline w Github Actions do budowania aplikacji (np. via fatjar)

❌ 4.0 Dodać notyfikację mailową o wynikach z sonara

❌ 4.5 Dodać krok z deploymentem aplikacji klienckiej na chmurę (obie ze sobą rozmawiają)

❌ 5.0 Dodać uruchomienie regresyjnych testów automatycznych (funkcjonalnych) jako krok w Actions w Browserstacku
# Roszkowice — backend PHP (Symfony + EasyAdmin)

Migracja backendu z Node.js + Prisma + AdminJS na PHP 8.3 + Symfony 7.1 + Doctrine ORM + EasyAdmin 5.

## Funkcjonalność

- Panel administracyjny pod `/admin` (EasyAdmin) z brandingiem Pałacu Roszkowice.
- CRUD postów na blogu z trzema tłumaczeniami (PL / EN / DE) edytowanymi w jednym formularzu.
- CRUD galerii z kategoriami (`exterior`, `park`, `remont`) i własną kolejnością wyświetlania.
- Drag & drop sortowanie galerii pod `/admin/gallery/reorder` (Sortable.js + zapis CSRF-protected POST).
- Akcje rekord-level „Wyżej" / „Niżej" przy każdym zdjęciu.
- Publiczne API:
  - `GET /api/posts?locale=pl|en|de`
  - `GET /api/posts/{id}?locale=pl|en|de`
  - `GET /api/gallery`
- Statyczne pliki: `/uploads/posts/*`, `/uploads/gallery/*` (zapisane przez panel) oraz `/images/*` (proxy do `app/public/images/*` z frontendu).
- Pojedynczy admin uwierzytelniany przez ENV (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).

## Wymagania

- PHP 8.3+ z włączonymi rozszerzeniami: `intl`, `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`.
- Dla importu legacy z Prisma (PostgreSQL): dodatkowo `pdo_pgsql`.
- Composer 2.x.
- MySQL 8 lub MariaDB 10.11+ (oba łączysz przez `mysql://` w `DATABASE_URL`). W panelu CyberFolks sekcja nazywa się zwykle **MySQL** — to normalne; pod spodem może być MariaDB lub MySQL, oba działają z tym samym driverem PDO.
- [Symfony CLI](https://symfony.com/download) (opcjonalnie, dla `symfony serve`).

### Lokalna baza (Windows)

Backend wymaga działającego serwera MariaDB lub MySQL na hoście i porcie zgodnym z `DATABASE_URL` (domyślnie `127.0.0.1:3306`). Jeśli w `services.msc` nie ma usługi MySQL/MariaDB, wybierz jedną z opcji:

**A) Docker (szybki start)**

```powershell
docker run --name roszkowice-mariadb `
  -e MARIADB_ROOT_PASSWORD=rootpass `
  -e MARIADB_DATABASE=roszkowice_php `
  -e MARIADB_USER=roszkowice `
  -e MARIADB_PASSWORD=roszkowicepass `
  -p 3306:3306 `
  -d mariadb:10.11
```

W `.env.local` ustaw np.:

```dotenv
DATABASE_URL=mysql://roszkowice:roszkowicepass@127.0.0.1:3306/roszkowice_php?serverVersion=mariadb-10.11.0&charset=utf8mb4
```

**B) Instalacja natywna** — zainstaluj [MariaDB](https://mariadb.org/download/) lub [MySQL](https://dev.mysql.com/downloads/mysql/), utwórz bazę `utf8mb4` i użytkownika, potem dopasuj `DATABASE_URL`.

Parametr `serverVersion` w URL musi odpowiadać wersji silnika (np. `mariadb-10.11.0` lub `8.0.36` dla MySQL 8). W `config/packages/doctrine.yaml` jest ustawione `mariadb-10.11.0` — przy innej wersji lokalnie ustaw spójnie oba miejsca albo polegaj na wartości z samego `DATABASE_URL` (Doctrine odczytuje ją z env).

### Włączenie `pdo_mysql` w Windows

W pliku `php.ini` (np. `C:\tools\php-8.3.11\php.ini`) odkomentuj wiersz:

```ini
extension=pdo_mysql
```

Sprawdź, czy działa: `php -m | findstr pdo_mysql`.

Jeśli planujesz uruchamiać `app:import-legacy` bezpośrednio z Postgresa, odkomentuj też:

```ini
extension=pdo_pgsql
```

## Instalacja

```bash
cd backend-php
composer install
cp .env.example .env.local
```

Ustaw w `.env.local`:

```dotenv
APP_SECRET=<32-znakowy losowy hex>
DATABASE_URL=mysql://user:pass@127.0.0.1:3306/roszkowice_php?serverVersion=mariadb-10.11.0&charset=utf8mb4

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme

CORS_ALLOW_ORIGIN=^http://localhost:5173$

LEGACY_DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/roszkowice?serverVersion=16&charset=utf8
FRONTEND_IMAGES_DIR=%kernel.project_dir%/../app/public/images
```

> Wszystkie powyższe zmienne są **wymagane** — aplikacja celowo nie używa fallbacków: brak wartości spowoduje wyjątek przy budowaniu kontenera usług Symfony.

## Migracja schematu

```bash
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
```

### Błąd połączenia z bazą (`SQLSTATE[HY000] [2002]`)

Komunikat w stylu „komputer docelowy aktywnie odmawia” oznacza, że na `host:port` z `DATABASE_URL` **nie nasłuchuje** MariaDB/MySQL albo port jest inny (np. XAMPP na `3307`). Sprawdź: działającą usługę lub kontener Docker, zgodność portu w URL, istnienie bazy i poprawność użytkownika/hasła. Test z CLI:

```powershell
mysql -h 127.0.0.1 -P 3306 -u twoj_user -p -e "SELECT 1"
```

## Import danych ze starego backendu (Prisma)

Jeśli istnieje stara baza Prisma (np. `roszkowice`), ustaw `LEGACY_DATABASE_URL` i uruchom:

```bash
php bin/console app:import-legacy
```

Komenda jest idempotentna:

- Galeria: pomija rekordy z istniejącą parą `(image, category)`.
- Posty: pomijają, jeśli istnieje post z tym samym `publishedAt` i polskim tytułem.

Uwaga: pliki obrazów z `backend/uploads/` nie są przenoszone — pole `image` zachowuje wartości legacy (`/images/...` lub `uploads/posts/...`). Trasa `GET /images/*` proxy'uje do `app/public/images/*`, a `/uploads/*` jest serwowane natywnie przez Symfony / serwer WWW. Jeśli chcesz przenieść starsze pliki uploadowane przez panel Node, skopiuj ręcznie:

```powershell
Copy-Item -Recurse ../backend/uploads/posts public/uploads/
Copy-Item -Recurse ../backend/uploads/gallery public/uploads/
```

## Deploy produkcyjny (CyberFolks: frontend + backend)

Poniżej model **jednej domeny** (np. `https://twojadomena.pl`): statyczny frontend Vite w `public_html`, Symfony obok, a żądania `/api`, `/admin`, `/images` (i uploady) trafiają do `backend-php/public/index.php`. W panelu CyberFolks widać często tylko **MySQL** — to ten sam protokół `mysql://` co dla MariaDB; wersję sprawdź w phpMyAdmin (`SELECT VERSION();`).

### 1. Baza MySQL

1. **Utwórz nową bazę MySQL** (użytkownik, hasło). Zapisz host (często `localhost` dla skryptów na tym samym koncie), port (`3306`), nazwę bazy.
2. W **phpMyAdmin** → SQL: `SELECT VERSION();` i ustaw w `DATABASE_URL` parametr `serverVersion` (MariaDB: `mariadb-10.11.0` itd., MySQL 8: `8.0.36` itd.).

### 2. Układ katalogów na serwerze

Typowo (nazwy mogą się różnić od panelu; ważne, żeby `public_html` i `backend-php` były **rodzeństwem** względem ścieżek w `.htaccess`):

```text
~/domains/twojadomena.pl/
  public_html/                 ← tu trafia build frontu (app/dist)
  backend-php/                 ← cały projekt Symfony
    public/
      index.php
      uploads/                   ← musi być zapisywalny przez PHP
    var/
    .env.local
```

Jeśli hosting wymusza inne ścieżki, dopasuj reguły w `.htaccess` (krok 5) tak, by wskazywały na realny `backend-php/public/index.php`.

### 3. Backend (Symfony) na serwerze

1. Wgraj katalog `backend-php/` (np. SFTP/Git). Nie wgrywaj lokalnego `vendor/` ani `var/cache`, jeśli na serwerze uruchomisz Composer.
2. Przez **SSH** (jeśli masz w panelu) w katalogu `backend-php`:

```bash
composer install --no-dev --optimize-autoloader
```

3. Utwórz `backend-php/.env.local` **tylko na serwerze** (nie commituj). Minimalny zestaw:

```dotenv
APP_ENV=prod
APP_DEBUG=0
APP_SECRET=<losowy-sekret-produkcyjny>

DATABASE_URL=mysql://user:pass@localhost:3306/nazwa_bazy?serverVersion=mariadb-10.11.0&charset=utf8mb4

ADMIN_EMAIL=twoj@email.pl
ADMIN_PASSWORD=<silne-haslo>

CORS_ALLOW_ORIGIN=^https://twojadomena\.pl$

DEFAULT_URI=https://twojadomena.pl

FRONTEND_IMAGES_DIR=/pelna/sciezka/do/public_html/images
LEGACY_DATABASE_URL=postgresql://...
```

- `CORS_ALLOW_ORIGIN` musi pasować do **dokładnego** originu strony (HTTPS + ewentualnie `www` — wtedy dopisz drugą domenę w regex lub uprość do listy w `nelmio_cors` jeśli kiedyś rozszerzysz konfigurację).
- `FRONTEND_IMAGES_DIR` to **absolutna** ścieżka do katalogu z obrazami statycznymi frontu (np. `.../public_html/images`), bo backend serwuje `GET /images/...` z [`LegacyImagesController`](src/Controller/LegacyImagesController.php). Po buildzie Vite upewnij się, że katalog `images/` (np. z `app/public/images`) jest w `public_html` obok `assets/`.
- `LEGACY_DATABASE_URL` jest potrzebne tylko jeśli na serwerze uruchamiasz `app:import-legacy` (zwykle import robisz lokalnie i wgrajesz dump — patrz sekcja importu niżej).

4. Migracje i cache:

```bash
php bin/console doctrine:migrations:migrate --env=prod --no-interaction
php bin/console cache:clear --env=prod
```

5. Uprawnienia (jeśli SSH):

```bash
chmod -R ug+rwX var
chmod -R ug+rwX public/uploads
```

### 4. Frontend (Vite) — build lokalnie, wgranie na hosting

Aplikacja w [`app/`](../app/) woła API pod `${VITE_API_URL}/api/...`. Na produkcji `VITE_API_URL` to **tylko origin** (bez końcowego slasha), np. `https://twojadomena.pl`.

1. Lokalnie utwórz np. `app/.env.production.local`:

```dotenv
VITE_API_URL=https://twojadomena.pl
```

(skopiuj też pozostałe zmienne z `app/.env`, których wymaga build.)

2. Build:

```bash
cd app
npm ci
npm run build
```

3. Zawartość katalogu `app/dist/` wgraj do **`public_html/`** (tak by `index.html` był w korzeniu domeny).

4. Upewnij się, że **statyczne obrazy** (np. `app/public/images/roszkowice/...`) trafiły do `public_html/images/...` — inaczej trasa `/images/...` z backendu nie znajdzie plików przy ustawionym `FRONTEND_IMAGES_DIR`.

### 5. Apache: `public_html/.htaccess` (jedna domena)

Docelowo: pliki z `dist` obsługuje Apache; ścieżki `/api`, `/admin` itd. przekazujesz do Symfony. **Ścieżka do `index.php` musi być zgodna z layoutem na koncie** — poniżej szablon, gdy `backend-php` leży obok `public_html`:

```apache
RewriteEngine On

RewriteRule ^api(?:/(.*))?$ ../backend-php/public/index.php [QSA,L]
RewriteRule ^admin(?:/(.*))?$ ../backend-php/public/index.php [QSA,L]
RewriteRule ^uploads(?:/(.*))?$ ../backend-php/public/index.php [QSA,L]
RewriteRule ^images(?:/(.*))?$ ../backend-php/public/index.php [QSA,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

RewriteRule ^ index.html [L]
```

- Pierwsze reguły kierują ruch API, panel EasyAdmin, uploady z panelu oraz proxy `/images` do front controllera Symfony.
- Ostatnia reguła to typowy fallback dla SPA (React router).
- Jeśli hosting nie pozwala na `../` w `RewriteRule`, ustaw **subdomenę** (np. `api.twojadomena.pl`) z document root = `backend-php/public` i wtedy w `VITE_API_URL` daj `https://api.twojadomena.pl` — wtedy **nie** potrzebujesz przepisywania `/api` w `public_html` (patrz punkt 7).

Plik [public/.htaccess](public/.htaccess) w `backend-php` musi pozostać na miejscu (standardowy front controller Symfony).

### 6. Import danych i plików

- **Baza:** najbezpieczniej lokalnie: `app:import-legacy` do MySQL, potem `mysqldump` i import w phpMyAdmin na CyberFolks (patrz sekcja [Import danych](#import-danych-ze-starego-backendu-prisma)).
- **Uploady z panelu:** skopiuj zawartość `backend-php/public/uploads/` na serwer (zachowując `posts/` i `gallery/`).

### 7. Alternatywa: subdomena tylko pod API

- Ustaw w panelu **subdomenę** `api.twojadomena.pl` z document root = `backend-php/public`.
- W `app/.env.production.local`: `VITE_API_URL=https://api.twojadomena.pl`.
- W `CORS_ALLOW_ORIGIN` uwzględnij origin frontu: `^https://twojadomena\.pl$`.
- W `public_html` zostaje wyłącznie statyczny front + ewentualnie SPA fallback; **nie** musisz wtedy przepisywać `/api` do `../backend-php`.

### 8. Szybka weryfikacja po wdrożeniu

- `https://twojadomena.pl` — strona główna SPA.
- `https://twojadomena.pl/api/gallery` — JSON (lub z subdomeny: `https://api.../api/gallery`).
- `https://twojadomena.pl/admin` — logowanie do EasyAdmin.
- `https://twojadomena.pl/images/...` — obraz z katalogu `public_html/images` (przez backend).

## Uruchomienie (lokalnie)

```bash
symfony serve --no-tls --port=8000
```

lub

```bash
php -S 127.0.0.1:8000 -t public
```

- Panel admina: <http://localhost:8000/admin>
- API: <http://localhost:8000/api/posts?locale=pl>, <http://localhost:8000/api/gallery>

Frontend (`app/`) musi mieć w `app/.env`:

```dotenv
VITE_API_URL=http://localhost:8000
```

## Struktura kontraktu API

Identyczna z poprzednim backendem Node — frontend `app/` nie wymaga zmian w kodzie.

`GET /api/posts?locale=pl|en|de`:

```json
[
  {
    "id": 1,
    "image": "http://localhost:8000/images/roszkowice/park/park.jpg",
    "publishedAt": "2025-10-19T00:00:00+00:00",
    "title": "Złota jesień...",
    "header": "Pałac Roszkowice",
    "content": "..."
  }
]
```

`GET /api/gallery`:

```json
[
  { "id": 1, "src": "http://localhost:8000/uploads/gallery/...jpg", "category": "exterior" }
]
```

## Architektura

- `src/Entity/` — Doctrine entities (`BlogPost`, `BlogPostTranslation`, `GalleryImage`).
- `src/Repository/` — repozytoria z dedykowanymi queries (np. `findAllWithTranslationForLocale`).
- `src/Controller/Api/` — publiczne API (`PostsController`, `GalleryController`).
- `src/Controller/Admin/` — EasyAdmin Dashboard, CRUD-y i `GalleryReorderController`.
- `src/Controller/LegacyImagesController.php` — proxy `/images/*` do frontendu.
- `src/Security/` — `EnvAdminUser`, `EnvAdminUserProvider`, `EnvAdminAuthenticator` (form_login z porównaniem 1:1 z ENV).
- `src/Service/` — `ImageUrlNormalizer` (DRY dla obu kontrolerów API), `GalleryReorderService` (logika sortowania).
- `src/Command/ImportLegacyDataCommand.php` — `app:import-legacy`.
- `migrations/` — Doctrine migrations.
- `templates/admin/` — login, dashboard, gallery_reorder (z Sortable.js z CDN).
- `public/admin/branding.css` — kolor primary `#c19a6b` i style kafelków dashboardu.
- `public/uploads/{posts,gallery}/` — pliki uploadowane przez panel.

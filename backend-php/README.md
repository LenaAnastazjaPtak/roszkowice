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

- PHP 8.3+ z włączonymi rozszerzeniami: `intl`, `pdo_pgsql`, `pgsql`, `mbstring`, `openssl`, `fileinfo`.
- Composer 2.x.
- PostgreSQL 14+ (zalecane 16).
- [Symfony CLI](https://symfony.com/download) (opcjonalnie, dla `symfony serve`).

### Włączenie `pdo_pgsql` w Windows

W pliku `php.ini` (np. `C:\tools\php-8.3.11\php.ini`) odkomentuj wiersz:

```ini
extension=pdo_pgsql
```

Sprawdź, czy działa: `php -m | findstr pgsql`.

## Instalacja

```bash
cd backend-php
composer install
cp .env.example .env.local
```

Ustaw w `.env.local`:

```dotenv
APP_SECRET=<32-znakowy losowy hex>
DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/roszkowice_php?serverVersion=16&charset=utf8

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme

CORS_ALLOW_ORIGIN=^http://localhost:5173$

LEGACY_DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/roszkowice?serverVersion=16&charset=utf8
FRONTEND_IMAGES_DIR=%kernel.project_dir%/../app/public/images
```

> Wszystkie powyższe zmienne są **wymagane** — aplikacja celowo nie używa fallbacków: brak wartości spowoduje wyjątek przy bootstrapowaniu kontenera.

## Migracja schematu

```bash
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
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

## Uruchomienie

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
- `migrations/` — Doctrine migrations (manualne, bo `pdo_pgsql` było wyłączone podczas generowania).
- `templates/admin/` — login, dashboard, gallery_reorder (z Sortable.js z CDN).
- `public/admin/branding.css` — kolor primary `#c19a6b` i style kafelków dashboardu.
- `public/uploads/{posts,gallery}/` — pliki uploadowane przez panel.

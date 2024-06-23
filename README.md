# E-Commerce

E-Commerce project. School work. (Under development)

## Config

Create your `.env` following `.env.example` and don't forget
to modify the `const HOST` in `src/public/js/config.mjs`

## Development

Modify the `HOST=` in `.env` to your location and the `NODE_ENV=` to
`development` and modify the `const HOST` in `src/public/js/config.mjs` as well.

```bash
npm ci
npm run build
```

## Up

```bash
docker-compose up
```

## Dependencies

- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `ejs`
- `express`
- `jsonwebtoken`
- `node-cron`
- `nodemailer`
- `sequelize`
- `sqlite3`
- `xss`
- `zod`

## Database

Currently the project uses SQLite `sqlite3` and `sequelize` as ORM.
The database location is at `.data/database.db`

## Preview

https://developstore.up.railway.app

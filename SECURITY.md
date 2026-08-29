# Security notes for operators

## Before this repo was opened

A MongoDB Atlas username/password was previously committed in source and Git history. If you ever used that cluster, **rotate the database user password (or delete the user) in Atlas now**. Old clones and Git history copies may still exist.

## Do not commit

- `.env` files
- API keys (`GEMINI_API_KEY`, `OPENAI_API_KEY`, Mailtrap, JWT secrets)
- Receipt images under `backend/data/receipts/`
- Local dumps under `backend/data/backups/`
- IDE datasource configs (`.idea/`)
- Dissertation/source Word files (`*.docx`)

## Required production settings

- `JWT_SECRET` must be a long random value, not the example string
- `DB_LINK` must point at your own database
- Change seeded demo passwords (`secret`) before any shared deployment

<div align="center">
  <img src="docs/logo.png" alt="ExpenseTracker" height="72" />
  <h1>ExpenseTracker</h1>
  <p>Gemini-powered receipt scanning and personal expense tracking</p>
</div>

Development codename: **Codename Monster**. The public product name is ExpenseTracker.

Paper receipts fade, get lost, and are slow to type in by hand. ExpenseTracker is built for individual users (originally targeted at New Zealand) who want to photograph a receipt, review what the model extracted, and keep a searchable history of shops, line items, and totals.

The UI is built with [Material Dashboard 2 PRO React](https://www.creative-tim.com/product/material-dashboard-pro-react) from [Creative Tim](https://www.creative-tim.com). See [License](#license).

## Screenshots

Dissertation figures in a two-column grid (same cell width on GitHub). Extra crops live in [`docs/figures/`](docs/figures/).

<table>
  <tr>
    <td colspan="2" align="center" width="100%">
      <img src="docs/figures/5-6-home-dashboard-and-filter-function.png" alt="Home dashboard" width="100%" />
      <br /><sub>Home — search, New, filter, date groups</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-7-browse-transactions.png" alt="Transaction detail" width="100%" />
      <br /><sub>Transaction detail</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-10-edit-and-delete-transactions.png" alt="Edit and delete" width="100%" />
      <br /><sub>Edit / delete</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-8-add-transactions-part-1.png" alt="Upload and Gemini" width="100%" />
      <br /><sub>Add — upload &amp; Gemini</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-9-add-transactions-part-2.png" alt="Review extracted fields" width="100%" />
      <br /><sub>Add — review &amp; save</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-1-login-page.png" alt="Login" width="100%" />
      <br /><sub>Login</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-2-register-page.png" alt="Register" width="100%" />
      <br /><sub>Register</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-3-password-reset.png" alt="Password reset" width="100%" />
      <br /><sub>Password reset</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-4-user-profile.png" alt="User profile" width="100%" />
      <br /><sub>Profile</sub>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="docs/figures/5-5-navigation-bar.png" alt="Navigation" width="100%" />
      <br /><sub>Responsive navigation</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-11-analytics-dashboard.png" alt="Analytics" width="100%" />
      <br /><sub>Analytics</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-12-sales-dashboard.png" alt="Sales metrics" width="100%" />
      <br /><sub>Sales metrics</sub>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="docs/figures/5-13-sales-dashboard.png" alt="AI spending tips" width="280" />
      <br /><sub>Sales — AI tips (phone layout)</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-14-user-management.png" alt="User management" width="100%" />
      <br /><sub>Users</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-15-role-management.png" alt="Role management" width="100%" />
      <br /><sub>Roles</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-16-category-management.png" alt="Category management" width="100%" />
      <br /><sub>Categories</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-17-tag-management.png" alt="Tag management" width="100%" />
      <br /><sub>Tags</sub>
    </td>
  </tr>
</table>

<details>
<summary>Design diagrams and evaluation receipts</summary>

<table>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/3-1-system-functional-structure-diagram.png" alt="Module diagram" width="100%" />
      <br /><sub>Functional modules</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/3-2-use-case-diagram.png" alt="Use cases" width="100%" />
      <br /><sub>Use cases</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-1-user-registration-process.png" alt="Registration flow" width="100%" />
      <br /><sub>Register flow</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-2-user-login-process.png" alt="Login flow" width="100%" />
      <br /><sub>Login flow</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-3-password-reset-process.png" alt="Reset flow" width="100%" />
      <br /><sub>Reset flow</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-4-data-adding-process.png" alt="Add flow" width="100%" />
      <br /><sub>Add-transaction flow</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-5-data-modification-process.png" alt="Edit flow" width="100%" />
      <br /><sub>Edit flow</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/4-6-data-deletion-process.png" alt="Delete flow" width="100%" />
      <br /><sub>Delete flow</sub>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="docs/figures/4-7-gemini-integration-design.png" alt="Gemini pipeline" width="240" />
      <br /><sub>Gemini: init → upload → extract → JSON</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-23-high-definition-supermarket-receipt.jpeg" alt="Sharp receipt" width="100%" />
      <br /><sub>Eval — sharp receipt</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="docs/figures/5-24-crumpled-partially-blurred-receipt.jpeg" alt="Crumpled receipt" width="100%" />
      <br /><sub>Eval — crumpled / blurry</sub>
    </td>
  </tr>
</table>

</details>

## Why it exists

Traditional bookkeeping is mostly manual. OCR on receipts has improved, but many consumer apps still make you type, and many recognition pipelines struggle with messy till rolls. This project combines:

1. **Gemini multimodal extraction** — shop name, address, phone, category, products, quantities, prices, time, and currency as JSON  
2. **A four-step capture flow** — upload → AI detect → human review → save  
3. **MongoDB documents** — transactions reference shops and products instead of flattening everything into one row  
4. **JWT + RBAC** — members use Home; admins can manage users, roles, categories, and tags  

On a labelled receipt set used during development, recognition was about **88.5% overall**, and about **97.7%** when the image was larger than 100KB with no large missing text blocks. Mean Gemini turnaround was about **3.1s** (roughly 2.2–5.3s). Faded or truncated receipts remain the weak case.

## What you can do

| Area | Behaviour |
| --- | --- |
| **Access** | Register, log in, reset password, edit profile (bcrypt passwords, JWT ~24h) |
| **Home** | Transactions grouped by date; search; category filter; open a record to see shop, lines, and the receipt image |
| **New transaction** | Drag-and-drop upload, choose Gemini, edit shop/products/notes, then persist |
| **Shops & products** | Created automatically when a transaction is saved; later queries reuse the same shop when name + address match |
| **Admin** | User / role / category / tag management (desktop recommended) |

Analytics and “AI spending tips” screens exist in the dashboard shell from the original template; the **receipt → ledger path on Home** is the product core this repo is meant to show.

## Architecture

Frontend and backend are split and talk over HTTP/JSON.

```
React (Material Dashboard 2)  →  Express REST API  →  MongoDB
                                      ↓
                               Gemini (receipt image → JSON)
```

- **Frontend:** React, MUI, React Router — `material-dashboard-react-pro/`  
- **Backend:** Node.js, Express, Passport JWT, Mongoose — `backend/`  
- **AI:** `@google/generative-ai` (`gemini-2.0-flash-exp`), API key only in `.env`

Typical add-transaction path:

1. User clicks **New** on Home  
2. Image is stored under `backend/data/receipts/`  
3. Gemini returns structured JSON (see below)  
4. User corrects fields  
5. Backend upserts shop and products, then inserts a transaction owned by the logged-in user  

## Gemini output shape

```json
{
  "shop": {
    "name": "Shop Name",
    "address": "Shop Address",
    "phone_number": "Phone Number",
    "category": "Category"
  },
  "products": [
    { "name": "Product Name", "quantity": 1, "unit_price": 0 }
  ],
  "total_quantity": 0,
  "total_price": 0,
  "currency": "NZD",
  "transaction_time": "ISO-8601"
}
```

Quantity defaults to `1` when the till slip omits it. Always check totals before saving.

## Data model (MongoDB)

Main collections: `users`, `roles`, `permissions`, `transactions`, `products`, `shops`, plus CMS-style `categories` and `tags` from the admin module.

A **transaction** stores time, user, shop, product id list, totals, currency, optional note, and `image_path`. A **shop** is unique on address in the current schema. **RBAC** is users → roles → permissions.

## Quick start

You need Node.js 16+ (18/22 fine), MongoDB (local or Atlas), and a [Gemini API key](https://ai.google.dev/).

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set at least `DB_LINK`, `JWT_SECRET`, `GEMINI_API_KEY`, `APP_URL_CLIENT=http://localhost:3000`, `APP_URL_API=http://localhost:8080`.

```bash
npm run seed
npm run start:dev
```

API default port: **8080**.

Seed logins (password `secret` — change these if you deploy):

- `admin@jsonapi.com`
- `creator@jsonapi.com`
- `member@jsonapi.com`

### Frontend

```bash
cd material-dashboard-react-pro
npm install --legacy-peer-deps
cp .env.example .env
npm start
```

Open `http://localhost:3000`. Keep `REACT_APP_API_URL=http://localhost:8080/`. After login you land on **Home**.

## Project layout

```
backend/                         # Express API, Mongoose, Gemini
material-dashboard-react-pro/     # React app (Home + auth + admin)
docs/logo.png                     # App icon (piggy bank)
docs/figures/                     # Dissertation screenshots and diagrams
```

Receipt images and local DB dumps are gitignored. Do not commit `.env`.

## Status

Open-sourced as a **portfolio / research implementation**, not a production bank app. Edit/delete against the API, extra AI vendors, and hardening are incomplete. That is enough to demonstrate the Gemini receipt pipeline and the full-stack design.

## License

Original ExpenseTracker application code is **MIT**. Material Dashboard 2 PRO React remains **Creative Tim**’s product and is **not** MIT. You need a Creative Tim licence to use those UI sources. Details: [LICENSE](LICENSE).

## Acknowledgements

UI based on Creative Tim Material Dashboard 2 PRO React. Receipt understanding uses Google Gemini. Screenshots and diagrams are from the project dissertation *An Intelligent Personal Financial Management System Using Google Gemini for Receipt Scanning*.

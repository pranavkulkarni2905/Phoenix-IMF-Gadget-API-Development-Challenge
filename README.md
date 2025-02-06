
# Phoenix IMF Gadget API - README
## Setup & Run Locally
- Clone the Repository


```
git clone https://github.com/pranavkulkarni2905/Phoenix-IMF-Gadget-API-Development-Challenge

cd phoenix-imf-gadget-api

```
- Install Dependencies


```
npm install
```
- Configure Environment Variables
- Create a .env file and add:


```
DATABASE_URL=postgres://user:password@localhost:5432/gadget_inventory_db
JWT_SECRET_KEY=your_secret_key
```

- Run Database Migrations (if using Sequelize)


```
npx sequelize-cli db:migrate

```
- Start the Server


```
npm run dev
```
- API Endpoints

```
POST /api/register – User Registration
POST /api/login – User Login
POST /api/gadgets – Create Gadget
GET /api/gadgets – Get All Gadgets
GET /api/gadgets?status=Available – Filter by Status
PATCH /api/gadgets/:id – Update Gadget
DELETE /api/gadgets/:id – Decommission Gadget
POST /api/gadgets/:id/self-destruct – Self-Destruct Gadget
```

## For more details, refer to the  https://docs.google.com/document/d/1hGZCk_e1Q4b30Fh_n78X9DtWsT0V_ozMm6qFExGTizc/edit?usp=sharing

<div align="center">  
  <img src= "https://github.com/user-attachments/assets/066c61a5-1012-4d95-9384-3360f17e3403" width="250px">
</div>
<div align="center"> 
  <p>
  E-Ride is an e-commerce platform for electric scooters, offering online purchases through Mercado Pago, user validation, favorites management, and an administrative interface with CRUD functionality for products. It features an intuitive UI and a simple payment system.
</p>
<a href="https://eride.paku.com.ar/">eride.paku.com.ar</a>
</div>

### 💻 Technologies

`React` `Express` `Zod` `MongoDb` `Bcrypt` `Tailwind` `JWT` `Mercadopago` `Vite` `Cypress`

### 🌟 Key Features

- **Product Catalog:** Users can browse a list of available electric scooters with detailed product information.
- **CRUD Operations:** The admin section allows creating, deleting, or modifying products in the catalog.
- **Product Filtering:** Users can search and filter scooters based on characteristics like price and brand.
- **Online Payments:** Integration with **MercadoPago** for secure and efficient payment processing.
- **Authentication & Security:** Uses `useContext` to protect routes, ensuring certain sections (like admin or favorites) are only accessible with a valid **authentication token** generated with JWT.
- **Error Handling:** The backend validates data using **Zod**, ensuring data correctness before processing or storing in the database.

## Endpoints

### Products

- GET api/scooters/

  - Returns all products

- GET api/scooters/:id

  - Retrieves a single product by ID

- GET api/scooters/filter/:type

  - Supports three filters: most popular products, daily featured product, and best deals

- POST api/scooters/
  - Creates a new product

### Users

- GET api/users/

  - Retrieves the list of users

- GET api/users/:id

  - Retrieves a user by their ID

- DELETE api/users/:id
  - Deletes the specified user

## Scripts

### Testing with Cypress

To run the tests, use the following command:
`pnpm run cd:open`

### Code Formatter

To format the code, run:
`pnpm run prettier`

## Cloning the Project

```
git clone https://github.com/pa-ku/eride-store.git
```

```
pnpm install

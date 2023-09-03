## Live Link

You can access the live version of this application [BOOK_CATEGORY](https://bookcategory-server.vercel.app).

# Application Routes

## User Routes

### 1. Sign Up

- **Route:** `POST /api/v1/auth/signup`
- **Description:** Create a new user account.

### 2. Login

- **Route:** `POST /api/v1/auth/login`
- **Description:** Login route.

### 3. List Users

- **Route:** `GET /api/v1/users`
- **Description:** Get a list of all users.

### 4. Get User by ID

- **Route:** `GET /api/v1/users/37775524-15e7-4f40-9d97-d30e43e56187`
- **Description:** Get a single user by their ID.

### 5. Update User

- **Route:** `PATCH /api/v1/users/37775524-15e7-4f40-9d97-d30e43e56187`
- **Description:** Update a user's information by their ID.

### 6. Delete User

- **Route:** `DELETE /api/v1/users/37775524-15e7-4f40-9d97-d30e43e56187`
- **Description:** Delete a user by their ID.

### 7. Get Profile

- **Route:** `GET /api/v1/profile`
- **Description:** Get the user's profile information.

## Category Routes

### 1. Create Category

- **Route:** `POST /api/v1/categories/create-category`
- **Description:** Create a new category.

### 2. List Categories

- **Route:** `GET /api/v1/categories`
- **Description:** Get a list of all categories.

### 3. Get Category by ID

- **Route:** `GET /api/v1/categories/de66e33b-ab44-410c-b298-973fc73692db`
- **Description:** Get a single category by its ID.

### 4. Update Category

- **Route:** `PATCH /api/v1/categories/de66e33b-ab44-410c-b298-973fc73692db`
- **Description:** Update a category by its ID.

### 5. Delete Category

- **Route:** `DELETE /api/v1/categories/de66e33b-ab44-410c-b298-973fc73692db`
- **Description:** Delete a category by its ID.

## Book Routes

### 1. Create Book

- **Route:** `POST /api/v1/books/create-book`
- **Description:** Create a new book.

### 2. List Books

- **Route:** `GET /api/v1/books`
- **Description:** Get a list of all books.

### 3. Get Books by Category

- **Route:** `GET /api/v1/books/ca939320-e124-4b4c-945d-bf742920b0a3/category`
- **Description:** Get books by a specific category.

### 4. Get Book by ID

- **Route:** `GET /api/v1/books/785b92e6-2d55-4aaf-a60d-e25084f9ceed`
- **Description:** Get a single book by its ID.

### 5. Update Book

- **Route:** `PATCH /api/v1/books/785b92e6-2d55-4aaf-a60d-e25084f9ceed`
- **Description:** Update a book by its ID.

### 6. Delete Book

- **Route:** `DELETE /api/v1/books/785b92e6-2d55-4aaf-a60d-e25084f9ceed`
- **Description:** Delete a book by its ID.

## Order Routes

### 1. Create Order

- **Route:** `POST /api/v1/orders/create-order`
- **Description:** Create a new order.

### 2. Get All Order

- **Route:** `GET /api/v1/orders/all`
- **Description:** Get a list of all orders.

### 3. Get all Order for specific Customers

- **Route:** `GET /api/v1/orders`
- **Description:** Get a list of all specific Customers orders.

### 3. Get Order by ID

- **Route:** `GET /api/v1/orders/0c1b4244-78c6-4947-8b0f-c53b4233c222`
- **Description:** Get a single order by its ID.

## Profile Route

- **Route:** `GET /api/v1/profile`
- **Description:** Get profile for users.

---

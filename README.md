## Live Link

You can access the live version of this application [here](https://book_category.com).

# Application Routes

## User Routes

### 1. Sign Up

- **Route:** `POST /api/v1/auth/signup`
- **Description:** Create a new user account.

### 2. List Users

- **Route:** `GET /api/v1/users`
- **Description:** Get a list of all users.

### 3. Get User by ID

- **Route:** `GET /api/v1/users/:userId`
- **Description:** Get a single user by their ID.

### 4. Update User

- **Route:** `PATCH /api/v1/users/:userId`
- **Description:** Update a user's information by their ID.

### 5. Delete User

- **Route:** `DELETE /api/v1/users/:userId`
- **Description:** Delete a user by their ID.

### 6. Get Profile

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

- **Route:** `GET /api/v1/categories/:categoryId`
- **Description:** Get a single category by its ID.

### 4. Update Category

- **Route:** `PATCH /api/v1/categories/:categoryId`
- **Description:** Update a category by its ID.

### 5. Delete Category

- **Route:** `DELETE /api/v1/categories/:categoryId`
- **Description:** Delete a category by its ID.

## Book Routes

### 1. Create Book

- **Route:** `POST /api/v1/books/create-book`
- **Description:** Create a new book.

### 2. List Books

- **Route:** `GET /api/v1/books`
- **Description:** Get a list of all books.

### 3. Get Books by Category

- **Route:** `GET /api/v1/books/:categoryId/category`
- **Description:** Get books by a specific category.

### 4. Get Book by ID

- **Route:** `GET /api/v1/books/:id`
- **Description:** Get a single book by its ID.

### 5. Update Book

- **Route:** `PATCH /api/v1/books/:id`
- **Description:** Update a book by its ID.

### 6. Delete Book

- **Route:** `DELETE /api/v1/books/:id`
- **Description:** Delete a book by its ID.

## Order Routes

### 1. Create Order

- **Route:** `POST /api/v1/orders/create-order`
- **Description:** Create a new order.

### 2. Get All Order

- **Route:** `GET /api/v1/orders/all`
- **Description:** Get a list of all orders.

### 3. List Orders

- **Route:** `GET /api/v1/orders`
- **Description:** Get a list of all orders.

### 3. Get Order by ID

- **Route:** `GET /api/v1/orders/:orderId`
- **Description:** Get a single order by its ID.

## Profile Route

- **Route:** `GET /api/v1/profile`
- **Description:** Get profile for users.

---

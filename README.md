# Interview 99Tech Backend

This repository contains the solutions for the technical interview at 99Tech. Below are the details for each problem.

## 1. Problem 4: Three Ways to Sum to N

**Folder:** `problem_4`

---

## 2. Problem 5: A Crude Server

### Backend (Node.js with Express)

**Folder:** `problem_5`

#### Setup and Run:

1. Navigate to the `problem_5` folder:
    ```bash
    cd problem_5
    ```

2. Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

3. Run the server in development mode:
    ```bash
    npm run dev
    ```

#### Or, use Docker:

1. Build and run the Docker container:
    ```bash
    docker-compose up --build
    ```

#### Troubleshooting TypeScript Issues:

If you encounter issues related to TypeScript, follow these steps:

1. Delete `node_modules`:
    ```bash
    rm -rf node_modules
    ```

2. Rebuild the Docker container:
    ```bash
    docker-compose up --build
    ```

---

### Frontend (React with Vite)

**Folder:** `problem_5_frontend/frontend`

#### Setup and Run:

1. Navigate to the frontend folder:
    ```bash
    cd problem_5_frontend/frontend
    ```

2. Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

3. Run the frontend application:
    ```bash
    npm run dev
    ```

#### Troubleshooting:

If you encounter the following error:

Ensure you are using **Node.js version 18 or higher**. You can switch to Node.js 18 using NVM:

1. Install Node 18 if not already installed:
    ```bash
    nvm install 18
    ```

2. Use Node 18:
    ```bash
    nvm use 18
    ```

---

## 3. Problem 6: Architecture
**Folder:** `problem_6`
Document in file: 
- README.MD or [Notion](https://irradiated-poultry-d6a.notion.site/99-TECH-Architecture-19f2ec8543a080a99e48e01234f97c1e)

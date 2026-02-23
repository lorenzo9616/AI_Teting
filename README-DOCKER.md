# 🐳 Running with Docker

Other users can test this application easily using Docker Compose.

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## Quick Start
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lorenzo9616/AI_Teting.git
    cd AI_Teting
    ```

2.  **Start the application:**
    ```bash
    docker-compose up -d
    ```

## Accessing the App
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

## Default Admin Credentials
- **Email:** `admin@restaurant.com`
- **Password:** `password123`

---
*Note: The first time you run `docker-compose up`, it will build the local images. To use pre-built images from Docker Hub, update the `image` fields in `docker-compose.yml`.*

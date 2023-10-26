# Makefile for Docker operations

# Variables
FRONTEND_IMAGE ?= frontend
BACKEND_IMAGE ?= backend
HOST ?= localhost:8080
CORS ?= localhost:8081
FRONTEND_PORT ?= 8081
BACKEND_PORT ?= 8080

.PHONY: build_frontend
build_frontend:
	@echo "Building Frontend Docker image..."
	docker build . -f src/Dockerfile --build-arg HOST="$(HOST)" -t $(FRONTEND_IMAGE)

.PHONY: build_backend
build_backend:
	@echo "Building Backend Docker image..."
	docker build backend -t $(BACKEND_IMAGE)

.PHONY: run_frontend
run_frontend:
	@echo "Running Frontend Docker container..."
	docker run -d -p $(FRONTEND_PORT):8080 $(FRONTEND_IMAGE)

.PHONY: run_backend
run_backend:
	@echo "Running Backend Docker container..."
	docker run -d -p $(BACKEND_PORT):8080 -e OPENAI_API_KEY="${OPENAI_API_KEY}" -e PORT=8080 -e HOST="http://$(CORS)" $(BACKEND_IMAGE)

.PHONY: build_all
build_all: build_frontend build_backend
	@echo "Both Frontend and Backend Docker images have been built."

.PHONY: run_all
run_all: run_frontend run_backend
	@echo "Both Frontend and Backend Docker containers are running."
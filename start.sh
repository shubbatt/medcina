#!/bin/bash
set -e

echo ""
echo "╔══════════════════════════════════════╗"
echo "║     Medcina — Docker Start           ║"
echo "╚══════════════════════════════════════╝"
echo ""

if ! docker info > /dev/null 2>&1; then
    echo "✗ Docker is not running. Open Docker Desktop first."
    exit 1
fi

# Check if images already exist — only build on first run
if docker image inspect medcina-backend > /dev/null 2>&1; then
    echo "▶ Images found — starting containers (fast)..."
    docker compose up -d
else
    echo "▶ First run — building images (this takes 3–5 min)..."
    docker compose build
    docker compose up -d
fi

echo ""
echo "▶ Waiting for backend..."
until curl -sf http://localhost:8000/api/v1/categories > /dev/null 2>&1; do
    printf "."
    sleep 3
done

echo ""
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  ✓ Medcina is running!                   ║"
echo "╠══════════════════════════════════════════╣"
echo "║  Frontend  →  http://localhost:3000      ║"
echo "║  Admin CMS →  http://localhost:8000/admin║"
echo "║  Login:       admin@medcina.mv           ║"
echo "║  Password:    change-me-immediately      ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Next time just run:  docker compose up -d"
echo "To stop:             docker compose down"
echo ""

set -a
source .env
set +a

docker compose build
docker compose up
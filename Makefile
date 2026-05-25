.PHONY: dev build lint typecheck test migrate seed deploy

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

typecheck:
	npx tsc --noEmit

test:
	npx playwright test

migrate:
	npx supabase db push

seed:
	npx supabase db reset --linked

deploy:
	vercel --prod

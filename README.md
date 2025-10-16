# Embeddings API — Generate embeddings from text (Postman ready)

Simple Node.js + TypeScript microservice that receives a piece of text and returns its embedding vector using OpenAI **`text-embedding-3-small`**.  
This repo contains only the **Generate Embeddings** functionality so you can test quickly from Postman.

---

##  Project structure (expected)

```
src/
 ├── index.ts                # entry point
 ├── app.ts                  # express app
 ├── data-source.ts          # TypeORM config + openaiClient export
 ├── types/
 │   └── Error.ts
 ├── middlewares/
 │   └── error-handler.ts
 └── api/
     ├── controllers/
     │   └── embedding.controller.ts
     ├── services/
     │   └── embedding.service.ts
     └── routes/
         └── embedding.routes.ts
.env
package.json
tsconfig.json
README.md
```

---

## What this service does

- Exposes a single endpoint to generate embeddings:
  - `POST /api/embbeding/` — body `{ "text": "your text here" }`
- Uses OpenAI `text-embedding-3-small` to produce a **1536-dimensional** vector for any input text.
- Returns JSON with the original text and the embedding array.

---

##  Requirements

- Node.js (>= 18 recommended)
- npm or yarn
- OpenAI API key

---

##  Environment variables

Create a `.env` file in repo root with:

```env
OPENAI_API_KEY=sk-...
PORT=3000
# (Optional DB envs if you keep TypeORM config)
HOST_BD=...
PORT_BD=5432
USERNAME_BD=...
PASSWORD_BD=...
DATABASE_BD=...
NODE_ENV=development
```

> The service uses `data-source.ts` to export `openaiClient` (in addition to your AppDataSource if you have one). Keep the API key secret.

---

## Run locally (dev)

Install deps and run:

```bash
npm install
# if using ts-node for dev:
npx ts-node src/index.ts
# or with nodemon (if configured):
npm run dev
```

If you prefer build + run:

```bash
npm run build
node dist/index.js
```

---

## Endpoint

### `POST /embedding`

- **URL:** `http://localhost:3000/api/embedding/`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "text": "¿El pozole es Mexicano?"
}
```

- **Success response (200):**
```json
{
  "text": "¿El pozole es Mexicano?",
  "embedding": [
    -0.01234,
    0.02345,
    ...
    // total length: 1536 numbers
  ]
}
```

- **Error responses:**
  - `400` if `text` is missing
  - `500` for internal/OpenAI errors (see logs)

---

## Example: Postman setup

1. Create a new POST request to `http://localhost:3000/api/embedding`.
2. Under the **Body** tab choose **raw** → **JSON** and paste:
```json
{
  "text": "Comida hecha al momento"
}
```
3. Send. You should receive JSON containing the `embedding` array (1536 floats).

---

## Notes & tips

- `text-embedding-3-small` returns a fixed-length vector (1536 dims).
- Token limit: if you send extremely long text, the model has a token limit (approx. thousands of tokens). For very large documents, split them into chunks and embed each chunk separately.
- Store embeddings in a vector DB (pgvector, Pinecone, Weaviate) if you plan retrieval / RAG later.
- Keep your `OPENAI_API_KEY` secret. Do not push `.env` to Git.

---

## Troubleshooting

- **No API key / unauthorized**: Verify `OPENAI_API_KEY` in `.env`.
- **Model errors on big text**: split text into smaller chunks before calling embeddings API.
- **Slow responses**: network or rate limiting from OpenAI; add retry/backoff if needed.
- **1536 numbers seem excessive**: that’s expected — it’s the vector representation.

---

## Next steps (suggested)

- Add `/similarity` endpoint: accepts two texts, returns cosine similarity.
- Persist embeddings in pgvector for retrieval/RAG.
- Build `/embedding-chunks` to automatically chunk long texts.

## Author

**Anselmo Pelcastre** 
❤️ Made with love and curiosity for learning Artificial Intelligence.

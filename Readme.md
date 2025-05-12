# 🧠 PDF Question Answering App

This is a full-stack application that allows users to upload a PDF and ask questions about its contents using a large language model (LLM). The app uses:

- ⚛️ React + Tailwind CSS (Frontend)
- ⚙️ FastAPI + LangChain + HuggingFace + Groq (Backend)
- 🧠 FAISS for vector search
- 💬 Conversational memory

---

## 📁 Directory Structure

```
.
├── frontend/             # React + Tailwind frontend
├── uploads/              # Uploaded PDF storage
├── main.py               # FastAPI app
├── qa_engine.py          # LLM + Vector engine logic
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
└── README.md             # Project documentation
```

---

## 🔧 Prerequisites

- Python 3.8+
- Node.js (v16+ recommended)
- npm or yarn
- [Groq API Key](https://console.groq.com/) (for LLM inference)

---

## ⚙️ Backend Setup (FastAPI + LangChain)

### 1. Clone the repository and navigate:

```bash
git clone https://github.com/divyaagrawal261/pdf_chat_bot.git
cd pdf_chat_bot
```

### 2. Create a virtual environment and activate it:

```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install dependencies:

```bash
pip install -r requirements.txt
```

### 4. Don't create a `.env` file in the root:
I have already used API_KEY directly in the code.

### 5. Run the backend:

```bash
uvicorn main:app --reload
```

> The backend will be available at: http://localhost:8000

---

## 💻 Frontend Setup (React + Tailwind)

### 1. Navigate to the frontend directory:

```bash
cd frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm start
```

> The frontend will be available at: http://localhost:3000 (default React port)

---

## 🚀 How to Use

1. Start both the **backend** and **frontend** servers.
2. Go to the frontend in your browser.
3. Click `+ Upload PDF` to upload a `.pdf` file.
4. Once uploaded, enter a question in the input box and press **Send**.
5. You'll see the question and AI-generated answer rendered as chat bubbles.

---

## 📡 API Endpoints

| Method | Endpoint                          | Description                      |
|--------|-----------------------------------|----------------------------------|
| POST   | `/upload-pdf/`                    | Upload a PDF file                |
| POST   | `/ask-question?question=...`      | Ask a question after uploading   |

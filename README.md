# 🦉 Signed Owl  
**10x your legal workflows by turning documents into data**

---

## 📌 About  

**Signed Owl** is a proof-of-concept legal automation platform built around **DocuSign’s Beta Navigator API**. It’s a full-stack tool for editing, redlining, and managing legal documents with AI assistance.

![image](https://github.com/user-attachments/assets/f0cb102c-a462-4390-869d-91305330b944)

### 🔧 Tech Stack

- **Frontend (Client)**:  
  TypeScript + React + Material UI

- **Backend (Server)**:  
  Python + FastAPI, with AI capabilities powered by **LangChain** and **LangGraph**

- **Database**:  
  MongoDB Atlas (cloud-based NoSQL store)

### 🔗 API Integrations

1. **DocuSign**  
   - **eSignature API**: Validate and verify AI-edited documents  
   - **Navigator API**: Extract key data points for categorization and analysis

2. **Google**  
   - Sync events with your **Google Calendar**

3. **OpenAI & HuggingFace**  
   - Power LLM tasks via remotely hosted language models

4. **Stripe**  
   - (Experimental) Auto-trigger payments based on document content

5. **Tavily**  
   - Scrape and analyze external websites to enrich agreement data

---

## ✨ Key Features

- **🔎 Categorization**  
  Automate document sorting by extracting key fields using the Navigator API—saving hours of manual tagging.

- **📝 AI-Powered Editing**  
  Redline and negotiate contracts with AI agents. Review, accept, or reject individual changes with a built-in change manager to keep full control.

- **📊 Insights & Clause Analysis**  
  Extract clauses, obligations, and flag risky deviations. Enhance reports with real-world context and citations using online research.

- **💬 AI Chat with Documents**  
  Talk to your contracts. Signed Owl stores document data as vectors and uses semantic search to answer complex legal questions.

- **📈 Auto-Generated Reports**  
  Visualize key extracted data through graphs and charts, all powered by the Navigator API.

- **🗓️ Kanban & Calendar View**  
  Manage deadlines, renewal dates, and more with task views and Google Calendar integration.

---

## 🚀 Getting Started

1. **Set Up Environment Variables**  
   - Fill in the `.env` file with your API keys and secrets  
   > ⚠️ Note: The Navigator API is currently in closed beta—access is limited.

2. **Start the Backend**  
   - Install dependencies:  
     ```bash
     pip install -r requirements.txt
     ```
   - Run the FastAPI server:  
     ```bash
     uvicorn backend:app --reload
     ```

3. **Start the Frontend**  
   - Install dependencies:  
     ```bash
     npm ci
     ```
   - Start the dev server:  
     ```bash
     npm run dev
     ```

4. **Authentication & API Access**  
   - In the **Users** section (top-right), connect to DocuSign’s eSignature & Navigator APIs  
   - Optionally log in with Google to enable event syncing

---

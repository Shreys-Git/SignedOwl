# 🦉 Signed Owl  
**10x your legal workflows by turning documents into data**
**Watch the demo here:** https://www.youtube.com/watch?v=ktDRMY9SwDw&ab_channel=ShreyashSingh
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
![image](https://github.com/user-attachments/assets/e52576e0-e550-4f64-b19a-9d7627b76328)

- **📝 AI-Powered Editing**  
  Redline and negotiate contracts with AI agents. Review, accept, or reject individual changes with a built-in change manager to keep full control.
![image](https://github.com/user-attachments/assets/b7c8c9c1-33fd-4bd5-b9b4-bc811c6b1c68)
![image](https://github.com/user-attachments/assets/f592061c-5902-4689-a4fb-6d483e46df71)

- **🖊️ E-Signatures with DocuSign**  
  Seamlessly send, sign, and manage legal documents with integrated e-signature functionality powered by DocuSign’s API.
![image](https://github.com/user-attachments/assets/9a297267-2ea3-4813-9d83-41e464b1f968)
  
- **📊 Insights & Clause Analysis**  
  Extract clauses, obligations, and flag risky deviations. Enhance reports with real-world context and citations using online research.
![image](https://github.com/user-attachments/assets/f054780c-1993-4448-8821-0abfff9f95b5)

- **💬 AI Chat with Documents**  
  Talk to your contracts. Signed Owl stores document data as vectors and uses semantic search to answer complex legal questions.
![image](https://github.com/user-attachments/assets/9da9406e-5f74-4ec8-8442-efb0c9ee009c)

- **📈 Auto-Generated Reports**  
  Visualize key extracted data through graphs and charts, all powered by the Navigator API.
![image](https://github.com/user-attachments/assets/c8465f3d-1cfd-4522-84ed-1abdd1ecedc0)

- **🗓️ Kanban & Calendar View**  
  Manage deadlines, renewal dates, and more with task views and Google Calendar integration.
![image](https://github.com/user-attachments/assets/79753be0-9768-4b93-a9a8-e6d4773042be)

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

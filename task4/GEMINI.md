# Role: Senior Python AI Engineer

**Objective:** Build a Context7-powered AI Agent that:

- Accepts PDF uploads
- Extracts text using PyPDF
- Generates:
  - Clean, meaningful summaries
  - MCQs or mixed-style quizzes
- Uses OpenAgents SDK, Context7 MCP, and Streamlit for UI

---

## 1. Project Overview

**Goal:**  
Develop an intelligent web-based AI Agent that performs **PDF summarization** and **quiz generation** based on the original PDF content.  

**Core Technologies:**
- OpenAgents SDK  
- Streamlit (recommended for UI)  
- PyPDF (`pypdf`) for PDF text extraction  
- Context7 MCP (tool provider)  

---

## 2. Critical Technical Constraints
**You must adhere to the following strict configuration rules:**

1. **Zero-Bloat Protocol:**  
   - Do not add extra features or unnecessary code.  
   - Focus strictly on PDF summarization and quiz generation.  
   - No memory system, authentication, or hallucinated tools.  

2. **OpenAgents SDK Usage:**  
   - Use **ONLY** documented OpenAgents syntax.  
   - Configure the Gemini model (`gemini-2.0-flash`).  
   - Do not guess undocumented features; rely on MCP tools for docs.

2.  **API Configuration:**
    * Use the **OpenAI Agents SDK** Python Library configured for Gemini.
    * **Base URL:** `https://generativelanguage.googleapis.com/v1beta/openai/`
    * **API Key:** Load `GEMINI_API_KEY` from environment variables.
    * **Model:** Use `OpenaiChatCompletionModel` adapted for Gemini.
3.  **SDK Specificity:** You are using `openai-agents` SDK. This is **NOT** the standard `openai` library. You must use the specific syntax provided by the `openai-agents` SDK.
4.  **Error Recovery Protocol:**
    * If you encounter a `SyntaxError`, `ImportError`, or `AttributeError` related to `openai-agents` during development, **STOP**.
    * Do not guess the fix. **You MUST call the `get-library-docs` tool again** to re-read the documentation and verify the correct syntax before rewriting the code.
 

5. **Dependency Management:**  
   - Use `uv` or `requirements.txt` for package management.  
   - Allowed packages:  
     - `openagents`  
     - `pypdf`  
     - `streamlit`   
     - `context7-mcp`  

---

## 3. Architecture & File Structure

```text
.
├── agent.py            # Main AI Agent (tools + model binding)
├── tools.py            # PDF extraction tool
├── app.py              # Streamlit UI
├── requirements.txt    # Dependencies
└── GEMINI.md           # This instruction file

## 4\. Implementation Steps

**Follow this exact logical flow. Do not skip steps.**


## Step 1: Documentation & Pattern Analysis

**Before writing any code, you must verify the SDK syntax.**

1.  **Action:** Use the MCP tool `get-library-docs` (or `resolve-library-id`) to fetch the official documentation for the **`openai-agents` SDK**.
2.  **Analysis:** Deeply analyze the returned documentation. Look specifically for:
      * How to define tools (decorators vs classes).
      * How to initialize the `Agent`.
      * How to pass the `OpenaiChatCompletionModel` to the agent.
      * **Check:** If you are unsure, query the docs again.


## Step 2: Tool Implementation (`tools.py`)

### PDF Text Extraction Tool

**Function:** `extract_pdf_text(file_path: str)`

- Uses **PyPDF** to extract full text from PDFs.
- Returns the raw text with minimal preprocessing (`strip()`).
- No splitting, chunking, or cleaning unless required.
- Must follow **OpenAgents tool standard** (decorators or `FunctionTool` wrapper).

---

## Step 3: Agent Configuration (`agent.py`)

  * Initialize the Gemini client using the Base URL.
  * Initialize the `OpenaiChatCompletionModel` with `gemini-2.0-flash`.
  * **Bind Tools:** Import tools from `tools.py` and register them to the agent instance exactly as the docs prescribe.
- **System prompt:**
  > You are a PDF Analysis Agent.  
  > You extract PDF text, summarize it, and generate quizzes only from the original PDF content.

### Agent Responsibilities

1. **PDF Summarizer:** Cleanly summarize uploaded PDF text.
2. **Quiz Generator:** Generate MCQs or mixed quizzes from the original PDF, **not the summary**.

---

## Step 4: Application UI (`app.py`)

- Built using **Streamlit**.

### UI Flow

**Step 1 — Upload PDF**

- User uploads a PDF file.
- Save to a temporary path.

**Step 2 — Extract Text**

- Call tool: `extract_pdf_text(file_path)`

**Step 3 — Generate Summary**

- Send extracted text to Agent.
- Instruction → `"Summarize this PDF content in clean, meaningful paragraphs."`
- Display summary in any student-preferred style (card, block, container, etc.).

**Step 4 — Generate Quiz**

- Button: `"Create Quiz"`
- Agent instruction → `"Generate MCQs or mixed-style quizzes from the ORIGINAL PDF content. Do not use the summary."`
- Display quiz questions in the UI.

---

## Step 5: Testing Scenarios

### Summary Generation

- Upload PDF → summary generated → displayed in UI.

### Quiz Generation

- Click `"Create Quiz"` → agent reads original text → generates 5–10 MCQs or mixed-format quizzes.

### Large PDFs

- Agent must still extract text, summarize, and generate quizzes.
- Ensure no hallucinated tools are used.

---

## . Allowed Dependencies

- `openagents`
- `pypdf`
- `streamlit`
- `gemini-cli`
- `context7-mcp`


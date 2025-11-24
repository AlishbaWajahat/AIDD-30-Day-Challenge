import os
from agents import Agent, OpenAIChatCompletionsModel, set_default_openai_client
from openai import AsyncOpenAI
from tools import extract_pdf_text
from dotenv import load_dotenv

load_dotenv()

# Load API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

# Configure AsyncOpenAI client for Gemini
gemini_client = AsyncOpenAI(
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
    api_key=GEMINI_API_KEY,
)
set_default_openai_client(gemini_client)

# Initialize OpenAIChatCompletionsModel for Gemini
gemini_model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=gemini_client,
)

# Initialize the Agent
pdf_agent = Agent(
    name="PDF Analysis Agent",
    instructions="You are a PDF Analysis Agent. You extract PDF text, summarize it, and generate quizzes from the extracted PDF content.",
    tools=[extract_pdf_text],
    model=gemini_model,
)

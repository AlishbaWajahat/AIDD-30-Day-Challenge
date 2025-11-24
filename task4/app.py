import streamlit as st
import os
import tempfile
import asyncio
from agentr import pdf_agent
from agents import Runner,Agent
from tools import extract_pdf_text # Import the tool directly

st.set_page_config(page_title="PDF Analysis & quiz generator Agent", layout="wide")
st.title("PDF Analysis & quiz generator Agent")

async def run_agent_task(agent, input_content):
    """Helper function to run agent tasks asynchronously."""
    result = await Runner.run(agent,input_content)
    return result.final_output

async def main():
    uploaded_file = st.file_uploader("Upload a PDF file", type=["pdf"])

    if uploaded_file:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            tmp_file.write(uploaded_file.getvalue())
            tmp_file_path = tmp_file.name

        st.success(f"File uploaded successfully: {uploaded_file.name}")

        # Step 2: Extract Text directly using the tool

        with st.spinner("Extracting text from PDF..."):
            # agent = Agent(name="extractor agent",tools=[extract_pdf_text])
            extracted_text = await run_agent_task(pdf_agent,f"Extract text from pdf {tmp_file_path}")
            st.session_state["extracted_text"] = extracted_text
            st.session_state["pdf_processed"] = True

        os.remove(tmp_file_path) # Clean up the temporary file

    if "pdf_processed" in st.session_state and st.session_state["pdf_processed"]:
        st.subheader("Extracted Text (for verification):")
        with st.expander("Click to view extracted text"):
            st.text_area("PDF Content", st.session_state["extracted_text"], height=300)

        # Step 3: Generate Summary
        if st.button("Generate Summary"):
            with st.spinner("Generating summary..."):
                summary_instruction = "Summarize this PDF content in clean, meaningful paragraphs.Don't make quiz just short summary."
                summary = await run_agent_task(pdf_agent, f'{summary_instruction} {st.session_state["extracted_text"]}')
                st.session_state["summary"] = summary
            st.subheader("Summary:")
            st.write(st.session_state["summary"])

        # Step 4: Generate Quiz
        if st.button("Create Quiz"):
            with st.spinner("Generating quiz..."):
                quiz_instruction = "Generate MCQs or mixed-style quizzes from this Extracted pdf text. Do not use the summary."
                quiz = await run_agent_task(pdf_agent, f'{quiz_instruction} {st.session_state["extracted_text"]}')
                st.session_state["quiz"] = quiz
            st.subheader("Quiz:")
            st.write(st.session_state["quiz"])

if __name__ == "__main__":

    asyncio.run(main())
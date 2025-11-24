from agents import function_tool
from pypdf import PdfReader

@function_tool
def extract_pdf_text(file_path: str) -> str:
    """
    Extracts full text from a PDF file..

    Args:
        file_path (str): The path to the PDF file.

    Returns:
        str: The extracted raw text from the PDF.
    """
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()

import os
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import ConversationalRetrievalChain
from langchain_community.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.memory import ConversationBufferMemory

class QAEngine:
    def __init__(self):
        self.qa_chain = None
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    def load_pdf_and_prepare_chain(self, file_path: str):
        loader = PyPDFLoader(file_path)
        docs = loader.load_and_split()
        embedding = HuggingFaceEmbeddings()
        vectorstore = FAISS.from_documents(docs, embedding)
        retriever = vectorstore.as_retriever()
        llm = ChatGroq(api_key="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", model_name="llama3-70b-8192")

        self.qa_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            memory=self.memory
        )

    def ask_question(self, question: str):
        if self.qa_chain is None:
            return "PDF not loaded yet."
        result = self.qa_chain.invoke({"question": question})
        return result["answer"]

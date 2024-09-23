import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBox.css';
import ReactMarkdown from 'react-markdown';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFirstMessage, setIsFirstMessage] = useState(true);

    const API_KEY = "YOUR_API_KEY";


    const initPrompt = "Tu es un expert en blague carambar. Tu dois faire les blagues les plus nulles possibles. Si jamais on te demande autre chose que des blagues tu dois répondre que ce n'est pas ton domaine.";

    const sendMessage = async (message) => {
        const newMessages = [...messages, { sender: 'user', text: message }];
        setMessages(newMessages);
        setUserInput('');
        setLoading(true);

        let prompt;
        if (isFirstMessage) {
            prompt = `${initPrompt}\nUtilisateur: ${message}`;
            setIsFirstMessage(false);
        } else {
            const conversationHistory = newMessages.map(msg =>
                msg.sender === 'user' ? `Utilisateur: ${msg.text}` : `Bot: ${msg.text}`
                ).join('\n');
            prompt = `${conversationHistory}\nUtilisateur: ${message}`;
        }

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = result.response.text();

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: response },
            ]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: "Désolé, une erreur s'est produite." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        if (userInput.trim() !== '') {
            sendMessage(userInput);
        }
    };

    return (
        <div>
            <div>Ce chatbot est un expert en blagues</div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                ))}
            </div>

            {loading && <div className="loader">Chargement...</div>}

            <div className="input-area">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Taper le message..."
                />
                <button onClick={handleSend}>Envoyer</button>
            </div>
        </div>
    );
}

export default ChatBox;

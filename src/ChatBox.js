import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBox.css';
import ReactMarkdown from 'react-markdown';
import {API_KEY} from "./const";

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const initPrompt = "Tu es un expert en blague carambar. Tu dois faire les blagues les plus nulles possibles. Si jamais on te demande autre chose que des blagues tu dois répondres que ce n'est pas ton domaine. "


    const sendMessage = async (message) => {
        const newMessages = [...messages, {sender: 'user', text: message}];
        setMessages(newMessages);
        setUserInput('');
        try {

            setLoading(true);
            // A chaque requette je lui redonne le prompt initial pour m'assurer qu'il ne dérive pas dans les questions posé
            const prompt = `${initPrompt} Question : ${message}`;

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);

            const response = result.response.text();

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: response },
            ])
            setLoading(false);

        } catch (error) {
            setLoading(false);

            console.error('Erreur dans l’appel à l’API:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {sender: 'bot', text: "Désolé, une erreur s'est produite."},
            ]);
        }

    };
    const handleSend = () => {
        if (userInput.trim() !== '') {
            sendMessage(userInput);
        }
    };

    return (
        <div>
            <div>
                Ce chat bot est un expert en blagues
            </div>
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

            {loading && (
                <div className="loader">Chargement...</div>

            )}

            <div className="input-area">

                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tapper le message..."
                />
                <button onClick={handleSend}>Envoyer</button>
            </div>
        </div>


    )
        ;
}

export default ChatBox;

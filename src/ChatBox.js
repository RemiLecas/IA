import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBox.css';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const API_KEY = "AIzaSyB2-T8HOFRXImOoeyTjQOqLCqUvWsg8G3s"

    const sendMessage = async (message) => {
        // Ajoute le message de l'utilisateur à l'interface
        const newMessages = [...messages, {sender: 'user', text: message}];
        setMessages(newMessages);
        setUserInput('');
        try {

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = message;

            const result = await model.generateContent(prompt);

            const response = result.response.text();

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: response },
            ])
        } catch (error) {
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
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
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

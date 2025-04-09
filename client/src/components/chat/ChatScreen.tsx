import { Box, Card } from "@mui/material";
import { UserText } from "./UserText";
import { AIResponseMessage } from "./AIResponseMessage";
import { UserChatInput } from "./UserChatInput";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChatModal } from "./ChatModal";
import { v4 as uuidv4 } from "uuid";

export type UploadedFile = {
  name: string;
  content: string;
};

export const ChatScreen = () => {
  const [isChatSetup, setIsChatSetup] = useState(false);
  const [filesIDs, setFileIDs] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isNewInputAvailable, setIsNewInputAvailable] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [AIMessages, setAIMessages] = useState<string[]>([]);

  // Effect to add new user input to userMessages and reset input
  useEffect(() => {
    if (isNewInputAvailable) {
      // Add user input to the list of user messages
      setUserMessages((prevMessages) => [...prevMessages, userInput]);

      // Call the API to get the AI response
      const sendMessageToAI = async () => {
        const payload = {
          session_id: uuidv4(),
          message: userInput,
          document_ids: filesIDs,
        };

        try {
          const response = await axios.post(
            "http://localhost:8000/v1/converse/rag",
            payload
          );

          if (response.status === 200) {
            // Add the current AI response to the existing ones
            setAIMessages((prevMessages) => [
              ...prevMessages,
              response.data.answer,
            ]);
          } else {
            console.error("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Error during POST request:", error);
        }
      };

      sendMessageToAI();

      // Reset user input and flag
      setUserInput("");
      setIsNewInputAvailable(false);
    }
  }, [isNewInputAvailable, userMessages, AIMessages, filesIDs, userInput]);

  return (
    <>
      {isChatSetup ? (
        <Card
          sx={{
            bgcolor: "#f5f5f5",
            height: "90vh",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              paddingRight: "8px",
            }}
          >
            {/* Render the messages */}
            {userMessages.map((message, index) => (
              <Box key={index}>
                <UserText text={message} />
                <AIResponseMessage text={AIMessages[index]} />
              </Box>
            ))}
          </Box>

          {/* User input area */}
          <UserChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            setIsNewInputAvailable={setIsNewInputAvailable}
          />
        </Card>
      ) : (
        <ChatModal
          currentFileIDs={filesIDs}
          setFileIDs={setFileIDs}
          setIsChatSetup={setIsChatSetup}
        />
      )}
    </>
  );
};

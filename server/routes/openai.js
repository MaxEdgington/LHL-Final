const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "OpenAI route is working!" });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate a list of 15 tasks (do not add numbered items as part of this task) related to web development in JavaScript or TypeScript with an SQL database. Each task should be in the format: "task title: task description". Based on the following project description, provide the tasks: ${description}`,
      },
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // If "gpt-4.0-turbo" is available, else use "gpt-4"
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    res.json({ generatedText });
  } catch (error) {
    console.error("Error with OpenAI API call:", error.message); // <-- This will log detailed error message.
    if (error.response) {
      console.error("OpenAI API Response:", error.response.data); // If axios error, this will log the API's response.
    }
    res.status(500).json({ error: "Failed to generate tasks using OpenAI." });
  }
});

module.exports = router;

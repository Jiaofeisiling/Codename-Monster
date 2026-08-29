const {GoogleGenerativeAI} = require("@google/generative-ai");
const {GoogleAIFileManager} = require("@google/generative-ai/server");

require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * @param {string} path - The path of the file to upload.
 * @param {string} mimeType - The mime type of the file.
 * @returns {Promise<object>} - The uploaded file object.
 */
async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

/**
 * Initializes and configures the model for receipt recognition.
 */
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  // systemInstruction: "# Role\nYou are an accurate receipt recognition agent that can quickly and accurately identify the content in the receipt image.\n# Skills\n## Recognize the content of the receipt image\n1. When the user provides a receipt image, use image recognition technology to accurately identify the text information in the image.\n2. Extract the following information and reply in JSON for. The reply template is as follows:\n  {\n    shop: {\n      name: \"Cinema Corner\",\n      address: \"45 Movie Lane\",\n      phone_number: \"09 3210-5432\",\n      category: \"Entertainment\",\n    },\n    products: [\n      {name: \"MOVIE TICKET\", quantity: 2, unit_price: 12.0},\n      {name: \"POP CORN\", quantity: 1, unit_price: 5.5},\n    ],\n    total_quantity: 3,\n    total_price: 29.5,\n    transaction_time: ,\n    currency: \"GBP\",\n  }\n# Restrictions\n1. The output content must be organized in the given format and cannot deviate from the framework requirements.\n2. Your answer must use the template.\n3. The default number of products is 1.",
  // systemInstruction: "{\"task\":\"Extract and organize data from receipt images.\",\"skills\":[\"Image recognition for receipt details.\",\"Text extraction from images.\"],\"process\":[\"Analyze receipt image for text extraction.\",\"Extract shop info, product list, and transaction details.\",\"Format data as JSON.\"],\"output_template\":{\"shop\":{\"name\":\"Shop Name\",\"address\":\"Shop Address\",\"phone_number\":\"Phone Number\",\"category\":\"Category\"},\"products\":[{\"name\":\"Product Name\",\"quantity\":1,\"unit_price\":\"Unit Price\"}],\"total_quantity\":\"Total Quantity\",\"total_price\":\"Total Price\",\"currency\":\"Currency\",\"transaction_time\":\"Transaction Time (ISO 8601 format)\"},\"notes\":[\"Default product quantity is 1 if not specified.\",\"Accurate text extraction is crucial.\",\"Use ISO 8601 for time format.\"]}",
  systemInstruction: "{\"task\": \"Extract and organize data from receipt images.\",\n  \"skills\": [\n    \"Image recognition for receipt details.\",\n    \"Text extraction from images.\"\n  ],\n  \"process\": [\n    \"Analyze receipt image for text extraction.\",\n    \"Extract shop info, product list, and transaction details.\",\n    \"Format data as JSON.\"\n  ],\n  \"output_template\": {\n    \"shop\": {\n      \"name\": \"Shop Name\",\n      \"address\": \"Shop Address\",\n      \"phone_number\": \"Phone Number\",\n      \"category\": \"Category\"\n    },\n    \"products\": [\n      {\n        \"name\": \"Product Name\",\n        \"quantity\": 1,\n        \"unit_price\": \"Unit Price\"\n      }\n    ],\n    \"total_quantity\": \"Total Quantity\",\n    \"total_price\": \"Total Price\",\n    \"currency\": \"Currency\",\n    \"transaction_time\": \"Transaction Time\"\n  },\n  \"notes\": [\n    \"Default product quantity is 1 if not specified.\",\n    \"Accurate text extraction is crucial.\",\n    \"MUST output transaction time!\"]\n}",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * Runs the process of uploading the image and processing it with the AI model.
 * @param {string} imagePath - The path to the image to be processed.
 */
async function processReceipt(imagePath) {
  const files = [
    await uploadToGemini(imagePath, "image/jpeg"),
  ];

  const chatSession = model.startChat({
    generationConfig: {
      ...generationConfig,
      responseMimeType: "application/json", // Ensure the response is in JSON format
    },
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());

  try {
    // Parse the response text into a JSON object
    const jsonResponse = JSON.parse(result.response.text());
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Failed to parse the response as JSON:", error);
    throw new Error("The response from the model is not valid JSON.");
  }
}

// Export processReceipt function for use in a backend endpoint
module.exports = { processReceipt };

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "{\"task\":\"Extract and organize data from receipt images.\",\"skills\":[\"Image recognition for receipt details.\",\"Text extraction from images.\"],\"process\":[\"Analyze receipt image for text extraction.\",\"Extract shop info, product list, and transaction details.\",\"Format data as JSON.\"],\"output_template\":{\"shop\":{\"name\":\"Shop Name\",\"address\":\"Shop Address\",\"phone_number\":\"Phone Number\",\"category\":\"Category\"},\"products\":[{\"name\":\"Product Name\",\"quantity\":1,\"unit_price\":\"Unit Price\"}],\"total_quantity\":\"Total Quantity\",\"total_price\":\"Total Price\",\"currency\":\"Currency\",\"transaction_time\":\"Transaction Time (ISO 8601 format)\"},\"notes\":[\"Default product quantity is 1 if not specified.\",\"Accurate text extraction is crucial.\",\"Use ISO 8601 for time format.\"]}"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/jpeg;base64,..."
          }
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "{\n  \"shop\": {\n    \"name\": \"City Bazaar\",\n    \"address\": \"\",\n    \"phone_number\": \"\",\n    \"category\": \"Retail\"\n  },\n  \"products\": [\n    {\n      \"name\": \"蓝莓/盒 (Blueberries/Box)\",\n      \"quantity\": 1,\n      \"unit_price\": \"7.90\"\n    },\n    {\n      \"name\": \"精品店-大号购物袋 (Boutique Large Shopping Bag)\",\n      \"quantity\": 1,\n      \"unit_price\": \"0.30\"\n    },\n    {\n      \"name\": \"20/30大虾 (Shrimp)\",\n      \"quantity\": 1,\n      \"unit_price\": \"35.84\"\n    },\n    {\n      \"name\": \"农夫山泉饮用天然水550ml/瓶 (Bottled Water 550ml)\",\n      \"quantity\": 1,\n      \"unit_price\": \"1.40\"\n    }\n  ],\n  \"total_quantity\": \"4\",\n  \"total_price\": \"45.44\",\n  \"currency\": \"CNY\",\n  \"transaction_time\": \"2025-01-17T18:34:24\"\n}"
        }
      ]
    }
  ],
  response_format: {
    "type": "json_object"
  },
  temperature: 1,
  max_completion_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
});
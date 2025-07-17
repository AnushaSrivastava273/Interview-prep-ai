// test-gemini.js - Create this file in your backend root directory
require('dotenv').config();

console.log("=== GEMINI API TEST ===");

// Step 1: Test the import
console.log("1. Testing import...");
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  console.log("✅ Import successful");
  console.log("   GoogleGenerativeAI type:", typeof GoogleGenerativeAI);
} catch (error) {
  console.log("❌ Import failed:", error.message);
  process.exit(1);
}

// Step 2: Test environment variable
console.log("\n2. Testing environment variable...");
const apiKey = process.env.GEMINI_API_KEY;
console.log("   API Key exists:", !!apiKey);
console.log("   API Key length:", apiKey ? apiKey.length : 0);
console.log("   API Key starts with:", apiKey ? apiKey.substring(0, 10) + "..." : "undefined");

if (!apiKey) {
  console.log("❌ GEMINI_API_KEY not found in environment variables");
  console.log("   Make sure your .env file contains: GEMINI_API_KEY=your_key_here");
  process.exit(1);
}

// Step 3: Test AI instance creation
console.log("\n3. Testing AI instance creation...");
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const ai = new GoogleGenerativeAI(apiKey);
  console.log("✅ AI instance created successfully");
  console.log("   AI instance type:", typeof ai);
  console.log("   Has getGenerativeModel method:", typeof ai.getGenerativeModel);
  
  if (typeof ai.getGenerativeModel !== 'function') {
    console.log("❌ getGenerativeModel is not a function");
    console.log("   Available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(ai)));
  }
} catch (error) {
  console.log("❌ AI instance creation failed:", error.message);
  process.exit(1);
}

// Step 4: Test model creation
console.log("\n4. Testing model creation...");
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
  console.log("✅ Model created successfully");
  console.log("   Model type:", typeof model);
} catch (error) {
  console.log("❌ Model creation failed:", error.message);
  console.log("   Error details:", error);
}

// Step 5: Test simple API call
console.log("\n5. Testing simple API call...");
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  console.log("   Making test API call...");
  model.generateContent("Hello, respond with just 'Working!'")
    .then(result => {
      console.log("✅ API call successful");
      console.log("   Response:", result.response.text());
      console.log("\n🎉 All tests passed! Your Gemini setup is working correctly.");
    })
    .catch(error => {
      console.log("❌ API call failed:", error.message);
      console.log("   This might be an API key or network issue");
    });
} catch (error) {
  console.log("❌ Test API call setup failed:", error.message);
}
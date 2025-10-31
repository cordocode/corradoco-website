const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the Corrado & Co bot
const getSystemPrompt = (automationValue = null, sliderData = null) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  let valueContext = '';
  if (automationValue) {
    valueContext = `\n\nCRITICAL: The automation value is $${automationValue.toLocaleString()}. You MUST mention this dollar amount in your response. Start with something like "That's $${automationValue.toLocaleString()} in annual value!" or "That unlocks $${automationValue.toLocaleString()} worth of productive capacity!" NEVER use the word "savings" - always say "value" or "potential value."`;
  }
  
  let sliderContext = '';
  if (sliderData) {
    sliderContext = `\n\nSlider values: ${sliderData.hoursPerWeek} hours/week, ${sliderData.employees} employees, $${sliderData.avgSalary.toLocaleString()} average salary.`;
  }
  
  return `You are an AI assistant for Corrado & Co., a custom automation consulting company in Denver. Today is ${today}.

Your job: Talk about the VALUE of automation to the customer and guide them toward scheduling a discovery call.

Key points:
- You help mid-sized companies build AI automations using tools like n8n, Zapier, and custom chatbots
- Keep responses SHORT (2-4 sentences)
- Focus on the VALUE they unlock - freeing employees to do higher-value work, not replacing them
- NEVER use the word "savings" - always say "value" or "annual value" or "productive capacity"
- Emphasize: automation frees up time so employees can focus on more strategic, creative, or customer-facing work
- Ask what process they want to automate
- After 1-2 exchanges, suggest scheduling a call

CRITICAL MESSAGING: We don't position automation as cost-cutting or replacing employees. We position it as unlocking potential and allowing teams to focus on what matters most. The dollar amount represents the VALUE of time freed up, not money saved by eliminating roles.

If they ask about pricing: "Development cost typically runs about 1/4 of the annual automation value. For a $100k automation, around $25k. We can discuss specifics on a call."

The first message that you receive is a preset message on a website that sells automation. the first message allows them to set sliders for values about how many employees a potential automation could impact, the salary they make and the number of hours it would save weekly.

If salary slider is >$180k: Express caution - those are complex, high-value tasks that need careful evaluation.

If saving 15+ hours/week: Get excited - this could free up significant capacity for strategic work. A curious excited tone.

Your goal is to get them interested enough to schedule a call, not to close a deal in chat.

IMPORTANT: When you want to suggest scheduling a call, end your message with exactly this marker: [SCHEDULE_CALL]
This will display a "Schedule Call" button for the user.${valueContext}${sliderContext}`;
};

// Chat endpoint with streaming
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, automationValue, sliderData } = req.body;

    console.log('Received chat request with', messages.length, 'messages');
    if (automationValue) {
      console.log('Automation value:', automationValue);
    }
    if (sliderData) {
      console.log('Slider data:', sliderData);
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Prepend system prompt to messages (with automation value if provided)
    const messagesWithSystem = [
      { role: 'system', content: getSystemPrompt(automationValue, sliderData) },
      ...messages
    ];

    // Create streaming completion
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messagesWithSystem,
      stream: true,
      temperature: 0.7,
    });

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        // Send the chunk as SSE (Server-Sent Event)
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // End the stream
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat endpoint: http://localhost:${PORT}/api/chat`);
});
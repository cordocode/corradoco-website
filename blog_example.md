## The Problem: Death by a Thousand Document Requests

Fleet Advisor was drowning in document requests.

Every day, employees fielded calls from customers asking for old DOT inspections, maintenance records, and invoices. Each request triggered the same tedious workflow: search through email archives, locate the right PDF, verify it's the correct document, and send it over.

**One minute to find the file.** Two more minutes if the customer needed multiple documents. With roughly 20 requests per month, the team was spending hours each week acting as a human file cabinet.

But the real cost wasn't just the time. It was what wasn't getting done. Every minute spent hunting for old paperwork was a minute not spent on higher-value work—scheduling, customer service, business development.

As Fleet Advisor prepared to open their third location, the founders knew this manual process wouldn't scale. They needed a better solution.

## The Traditional Solution Would Have Cost $20,000+

The obvious answer? Build a customer portal.

You know the kind: layers of nested folders, clunky search filters, dropdown menus, login credentials customers forget, and a dashboard that requires three clicks just to find a single document.

Traditional custom dashboards for this type of functionality typically run **$15,000-$30,000**. They're expensive to build, frustrating to use, and require constant maintenance.

There had to be a better way.

## Our Solution: An AI-Powered Document Assistant

Instead of a traditional portal, we built something simpler and smarter: a conversational AI interface that lets customers request documents in plain English.

No folders to navigate. No filters to configure. Just type what you need:

- "Find the DOT inspection for unit 1234"
- "Show me all my invoices from September"
- "When was the last PM for the truck ending in VIN EO15?"

The AI understands the request, searches the database, and returns the exact documents—filtered to show only that customer's information.

**Simple. Fast. On-brand.**

## The Technical Challenge: Building a Reliable Foundation

Making this work required solving two critical problems:

### Problem 1: Getting documents into the system consistently

Every inspection report and invoice needed to flow automatically into a centralized database. Since all documents were already being emailed to customers, we had a natural integration point.

We set up an automated workflow using **n8n** that:

- Monitors incoming emails to a designated inbox
- Filters out irrelevant messages
- Downloads and extracts attachments
- Renames files using a consistent naming convention
- Uploads everything to Supabase (our database)
- Cross-references customer data from the ERP system to ensure proper access control

Now every document is automatically captured, organized, and made searchable—without anyone lifting a finger.

### Problem 2: Handling 6,500 historical documents

The automated workflow solved the problem going forward. But what about years of historical documents?

We needed those too, or customers would still be calling about older records.

Fleet Advisor's ERP provider didn't have an API for bulk document export, but they were able to generate a CSV file containing URLs for all 6,500 historical documents. Now we just had to download, process, and rename them all using the same consistent format.

This proved tricky. With current documents, we could easily spot-check a few files to verify accuracy. With 6,500 historical documents—many handwritten or in inconsistent formats—validation was harder.

I built a processing script and a randomized testing program that would pull 100 files, let me manually verify them, and check the output. After a few iterations and refinements, we achieved **100% accuracy across 100 test files**. Good enough to run the full batch.

## The Final System: Simple on the Surface, Sophisticated Underneath

The customer-facing interface is beautifully simple: a chat window styled to match Fleet Advisor's brand.

Behind the scenes, the system includes:

- **Frontend:** Vercel-hosted React application
- **Database:** Supabase for document storage and customer data
- **Automation:** n8n workflows for email processing, Zapier for ERP integrations
- **AI:** OpenAI API with custom system prompts
- **Security:** Customer authentication and data filtering to ensure privacy

The AI doesn't just search filenames. We fed it detailed context about Fleet Advisor's business—when they were founded, where their locations are, what services they provide—so it can answer basic company questions while retrieving documents.

## The Results: 750 Documents Processed, 25 Retrieved

In the first month after launch, the system automatically processed 750 incoming documents and handled 25 customer retrieval requests.

Let's do the math:

- **Document processing:** 750 documents × 1 minute each = 750 minutes saved
- **Customer retrieval:** 25 requests × 2 minutes each = 50 minutes saved
- **Total time saved per month:** 800 minutes (~13.3 hours)
- **Annual time saved:** 160 hours (800 minutes × 12 months)
- **Annual value at $85k salary:** $6,539 ($40.87/hour × 160 hours)

But the real value goes beyond time savings:

- **Instant customer service:** Customers get documents immediately, any time of day
- **Scalability:** The system handles 10 requests or 1,000 with no additional cost
- **Employee focus:** Staff can spend time on higher-value work instead of document retrieval
- **Better customer experience:** No more waiting on hold or playing phone tag

## What This Means for Your Business

If your team is spending hours each week responding to repetitive customer requests—whether it's documents, data lookups, status updates, or FAQs—there's probably a smarter way to handle it.

The key isn't just throwing AI at the problem. It's building a system that:

1. Captures information consistently so the AI has reliable data to work with
2. Integrates with your existing tools rather than replacing your entire workflow
3. Provides genuine value to both your team and your customers

That's what custom automation is all about: identifying the manual processes that drain your team's time and building elegant solutions that free them to focus on work that actually grows your business.
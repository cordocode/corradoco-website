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


----------------------------------

## Four Hard Truths About Automation I Learned From a Simple Invoice Script

My first automation project wasn't glamorous. It didn't save thousands of hours or generate millions in revenue. It saved me an hour a week renaming invoice files as a commercial property manager.

But that small project—building a Python script to automatically process and rename 50 invoices every Monday—taught me lessons I apply to every automation I build today, including multi-thousand-dollar systems for clients.

Here's what I learned.

## 1. Human Intuition Is Invisible Until You Try to Automate It

When I started building my invoice renaming script, I thought the task was simple: extract the vendor name, property code, invoice date, and invoice number from each PDF. Format them consistently. Done.

What I didn't realize was how much tacit knowledge I was applying without even thinking about it.

When I saw "ABC Landscaping" on an invoice, I automatically knew it was for the Riverside property. When "Johnson Plumbing" listed our billing address instead of the service address, I knew which building they'd actually worked on. When certain vendors used customer IDs instead of invoice numbers on recurring charges, I knew to grab that instead.

**I had about 100 edge cases in my head.** Things I'd learned over months of doing this manually. Rules I'd never written down because I didn't even know I was following them.

Automation forces you to document everything. Every assumption. Every exception. Every bit of context you're unconsciously applying.

Before you write a single line of code, write down your process. Then actually follow it, step by step, like a computer would. You'll be shocked at how many "obvious" decisions you make that aren't obvious at all.

## 2. Perfect Is the Enemy of Done

I spent weeks trying to get my invoice script to 100% accuracy. Every time I fixed one edge case, I'd discover another. A vendor would suddenly change their invoice format. A handwritten invoice would come in with terrible handwriting. A PDF would be scanned upside down.

I could have spent months accounting for every possible scenario. Instead, I shipped at 95% accuracy.

Here's why that was the right call: I still had human oversight. The script flagged files it couldn't process with complete confidence. Those went into a separate folder for manual review. Instead of processing 50 invoices manually, I was processing 2-3.

**95% automation beats 0% automation every single time.**

The perfect system that never ships helps nobody. The good-enough system that ships today and improves over time actually provides value.

## 3. Build Flexible Systems

My biggest breakthrough came when my brother suggested: "Don't hard-code your business rules. Put them in a Google Sheet."

Instead of writing Python code that said "if the vendor is ABC Landscaping, assign it to Riverside property," I created a spreadsheet where each vendor had a row with their name, expected invoice format, and properties they serviced.

The script just referenced the sheet.

This changed everything. When I discovered a new edge case, I didn't need to modify code—I just updated the spreadsheet. When a vendor changed their invoice numbering system, I edited one cell. When we added a new property, I added a row.

**Separate your data from your logic.** Your business rules will change constantly. Your code shouldn't have to.

This principle applies to every automation I build now. Configuration lives in databases, spreadsheets, or environment variables. Code stays generic and flexible. When requirements change—and they always do—updates are simple.

## 4. The ROI Isn't Always About Money

When I calculated the value of my invoice automation, the numbers were modest: 48 hours saved per year, roughly $1,920 in value at $40/hour.

Not life-changing money. Not enough to quit my job. Just a small efficiency gain.

But here's what the math doesn't capture:

**Mental relief.** I stopped dreading Monday mornings. That hour of mind-numbing work that started every week was gone.

**Reclaimed focus.** Instead of burning an hour on administrative tasks, I could spend that time on actual property management—tenant relationships, maintenance oversight, strategic planning.

**Proof of concept.** I proved to myself that I could build automation. That first small win gave me the confidence to tackle bigger projects.

**Compound effect.** That hour per week compounded. Over two years, 96 hours saved. Over five years, 240 hours. Time I redirected toward learning more about automation, which eventually led to starting my own automation consulting business.

The real value isn't always in the immediate time savings. It's in the momentum, the confidence, and the foundation you build for bigger things.

----------------------------------

## The Problem: An Hour a Week Naming Files

Every Monday morning started the same way. Download 50 invoices from Dropbox. Open each one. Read the vendor name. Find the property code. Look for the invoice date. Locate the invoice number. Type it all out in the exact format: `PROPERTY_VENDOR_NAME_MMDDYY_123456`. Save. Repeat.

Fifty times.

As a commercial property manager, I was spending an hour every single week just renaming files. It was mind-numbing work, but it mattered. These weren't just invoices—they were proof of payment for landscaping, maintenance, repairs. In commercial property management, having organized records isn't optional. When a tenant complains about a repair or a vendor disputes a payment, you need to find that invoice immediately.

So every week, I sat there clicking through files, copying and pasting details, making sure everything was exactly right. 

**One hour.** Every week. Forever.

There had to be a better way.

## The "Obvious" Solution That Wasn't So Simple

"Just use ChatGPT to automate it."

That's what I thought. How hard could it be? Feed ChatGPT a prompt, get a Python script, rename all my files automatically. Maybe an afternoon of work, tops.

I had no idea what I was getting myself into.

The problem wasn't the technology—it was all the human intuition I'd built up over years of doing this manually. Things I didn't even realize I was doing.

When I saw "ABC Landscaping" on an invoice, I automatically knew it was for the Riverside property. When "Johnson Plumbing" listed our billing address instead of the service address, I knew which building they'd actually worked on. When certain vendors used customer IDs instead of invoice numbers on recurring charges, I knew to grab that instead.

**I had about 100 edge cases in my head.** And I was about to discover that writing them all down was just the beginning.

## When Your Tools Don't Have the Tools

Then came the bigger problem: our property management CRM was ancient. No API. No export function. No way to pull the vendor list or property codes into my automation.

This is when doubt crept in. Was this even possible? How could my script verify vendor names without access to our vendor database?

**More importantly: was it even worth it?** How many hours would it take to build this thing versus the five hours per week I'd save?

I almost gave up. Then I had a conversation with my brother—a programmer who actually knew what he was doing.

His advice changed everything: "Build a proxy database in Google Sheets."

## Building the Foundation: A Temporary CRM

The solution was simple but required discipline. I'd manually replicate our critical vendor data in a Google Sheet. Yes, it meant double data entry for now. But once we eventually upgraded to a modern CRM, this sheet would automatically populate through their API.

I built a spreadsheet with everything my automation needed to succeed:

- Vendor names (including alternate spellings and common variations)
- Expected invoice number formats for each vendor
- Properties they typically serviced
- Edge cases and exceptions

This became my system's brain. Instead of hard-coding rules into the Python script, the script would reference this living document. When I discovered a new edge case, I'd just update the sheet—no code changes required.

Now I had a data source. Time to build the actual automation.

## The Reality: OCR, Regex, and Messy Data

Here's what most people don't tell you about automation: the technology is rarely the hard part. The hard part is accounting for reality.

In early 2023, ChatGPT-3 existed, but its vision capabilities were expensive and limited. I needed traditional OCR—Optical Character Recognition—to convert PDFs into text. This meant using **pdf2image** to convert each page into an image, then **Google Cloud Vision API** to extract the text.

What came back was a mess. Words squished together. Missing whitespace. Random line breaks. Just a giant unformatted string of text with no structure.

Now the real work began: writing pattern-matching logic to pull out exactly what I needed.

### Problem 1: Identifying the Property

Some invoices listed the property name. Some listed the address. Some listed *our* address instead of the service address. Some listed multiple properties because the vendor split one invoice across several buildings.

Solution: I created a weighted keyword matching system in the Google Sheet. For each property, I listed identifying keywords across multiple columns. But I made one column—the primary property name—count **5x more** than the others. This way, "Riverside Gardens" would beat out "Riverside" or "Gardens" individually.

### Problem 2: Validating Vendor Names

Vendors don't use consistent names. "ABC Landscaping Inc." vs "ABC Landscaping" vs "ABC LNDSCP." 

Solution: The script first attempts exact matches, then falls back to split-name matching—checking if all individual words from the vendor name appear anywhere in the document, even on different lines.

### Problem 3: Finding the Invoice Date

Every vendor formatted dates differently. MM/DD/YYYY. DD-MM-YY. March 15, 2023. Mar 15, 2023.

Solution: I wrote regex patterns for every common date format, then had the script find *all* dates in the document and return the furthest future date (typically the invoice date rather than a service date from weeks prior).

### Problem 4: Extracting Invoice Numbers

This was the hardest one. Some vendors put invoice numbers at the top. Some at the bottom. Some called them "Invoice #" while others used "Inv#" or "Invoice No." or just "Number:". Recurring invoices sometimes had customer IDs instead.

Solution: The script generates a flexible regex pattern based on the expected format in the Google Sheet. So if the sheet says vendor XYZ uses "INV-12345", the pattern becomes `[A-Za-z]{3}-\d{5}`. Then it searches near the detected invoice date, since those fields are usually close together.

## The Handwritten Invoice Problem

Just when I thought I'd solved everything, I remembered: two of our vendors sent handwritten invoices. A handyman and a locksmith who'd been with us for years.

Standard OCR can't handle handwriting. The text comes back garbled, or not at all.

This was my first time working with the **Google Vision API** for real. I sent each handwritten document to their servers and requested structured printed text output. Even if a few letters were off—"5mith" instead of "Smith"—I could use probability matching to find the closest vendor in my database.

It was scrappy. It wasn't perfect. But for a two-person property management company where I could spot-check the results, it worked.

## Testing: The Unglamorous But Critical Phase

I now had a working script. Or at least, I *thought* I did.

Before running it on live invoices, I needed to test it thoroughly. I built a companion testing script that would:

1. Download a random sample of historical invoices from Dropbox
2. Store the original, human-generated filenames
3. Randomly rename them with number blocks (001.pdf, 002.pdf, etc.)
4. Run my automation script
5. Compare the script's output against the original human names

**Error after error.** Vendor name mismatches. Date format failures. Invoice numbers pulled from the wrong line. 

Each failure revealed another edge case I hadn't considered. I updated the Google Sheet rules, refined the regex patterns, adjusted the weighting systems.

After dozens of iterations, I finally hit my target: **95% accuracy.**

Not perfect. But good enough for a system where I'd be spot-checking the 5% that the script flagged as uncertain.

## The Final System: A Single Terminal Command

Today, the system runs with a single command in my terminal.

Files that process successfully move to the "NAMED" folder. Files with missing information stay in the "NAME_IT" folder for manual review.

## The Results: A Five-Minute Coffee Break

Two years later, I'm still using this script every week.

The routine now: sit down at a coffee shop, drop the week's invoices into the input folder, type `python invoice_rename.py` in my terminal, and watch it run while I sip my coffee.

Five minutes instead of an hour.

Let's do the math:

- **Time saved per week:** 55 minutes (60 minutes - 5 minutes for spot-checking)
- **Annual time saved:** 48 hours
- **Annual value at $40/hour:** $1,920

But those numbers don't capture the real value. It's the mental relief of not dreading Monday mornings. It's having the bandwidth to focus on higher-value property management work. It's the satisfaction of watching a system you built solve a problem automatically.
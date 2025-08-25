# How to Replace Your CMS with a Static Site Using Amazon Q CLI Chat

*Published: August 25, 2025*  
*Author: Paul Santus*  
*Live website: [www.terracloud.fr](https://www.terracloud.fr)*

## Taking on the AWS Builder Challenge

I decided to tackle the **AWS Builder Challenge #cloud-launch-challenge-1** by completely rebuilding my consulting website from scratch. The challenge? Replace a traditional WordPress CMS with a modern static site architecture - and do it fast. 

**Spoiler alert**: The entire process took less than 5 hours, thanks to Amazon Q CLI Chat as my AI pair programming partner.

## The Problem with Traditional CMS Solutions

When I started consulting, doing a WordPress website was the fastest way, but it has some pain points attached:

### Performance Issues = SEO Problems
WordPress sites, even well-optimized ones, typically load in 2-4 seconds. Google's Core Web Vitals have made it clear that anything over 2.5 seconds hurts your search rankings. My WordPress site was averaging 3.2 seconds on mobile - not terrible, but not great either.

### Infrastructure Overhead
Running WordPress means you need:
- A web server (Apache/Nginx)
- A database (MySQL/PostgreSQL) 
- PHP runtime
- Regular security updates
- Backup systems
- Monitoring

This translates to higher hosting costs and a larger environmental footprint. My previous setup cost around €45/month for decent performance.

### Vendor Lock-in with Page Builders
Solutions like Webflow are beautiful but expensive - starting at $23/month for basic features, scaling up to $212/month for advanced functionality. You're also locked into their ecosystem, making migration difficult.

For a simple business website that updates maybe once a week, this felt like overkill. I needed something faster, cheaper, and more maintainable.

## The Static Site Solution

Static sites solve these problems elegantly:
- **Performance**: Files served directly from CDN, sub-second load times
- **Cost**: S3 + CloudFront costs under $5/month for most business sites
- **Security**: No server-side code = minimal attack surface
- **Scalability**: CDN handles traffic spikes automatically
- **Environmental impact**: Significantly lower energy consumption

## My Journey: From WordPress to Static with Amazon Q CLI Chat (Under 5 Hours!)

### Step 1: The Great Migration Begins (45 minutes)

**The Challenge**: Extract content from my existing WordPress site without losing structure or formatting.

**The Solution**: I used Amazon Q CLI Chat to generate a website crawler. Here's how that conversation went:

```
Me: "I need to download a complete copy of my WordPress website for migration. 
Can you help me build a crawler that preserves the site structure?"

Q: "I'll help you create a comprehensive website crawler. Let me build something 
that handles WordPress-specific patterns..."
```

The result was this crawler: [ai-example-website-downloader](https://github.com/psantus/ai-example-website-downloader)

**Key Learning**: Q CLI Chat excels at understanding context and building practical tools quickly. What would have taken me hours of research and coding was done in minutes.

**Aha Moment**: The crawler not only downloaded content but also mapped the URL structure, making the migration path clear.

### Step 2: Building the React Foundation (1 hour)

**The Challenge**: Create a static React application that could replicate my WordPress site's functionality.

I gave Q CLI Chat this prompt:

```
"I want you to build a static website. 
* The website will be hosted in S3 and distributed via CloudFront. Thus, it should not include server-side rendering. 
* In ./terracloud_fr you'll find a copy of the current website (uses server-side rendering using wordpress). 
* You should include the same menus / static pages. 
* For the blog section, it should be fairly easy to add content to the website, ideally by creating a markdown-formatted file (and referencing it in a list of articles), to be interpreted by the frontend app."
``` 

**The Magic Happened**: Q CLI Chat analyzed my WordPress structure and generated:
- A complete React application with routing
- Responsive design matching my original site
- SEO-optimized meta tags and structured data

**Important Note**: The Markdown blog engine was actually implemented in a separate iteration. With agentic development, you still need to keep AI on a short leash - complex features work better when broken down into focused tasks.

### Step 3: The i18n Challenge (1.5 hours)

**The Challenge**: My site needed French and English versions. This turned out to be the trickiest part.

**The Problem**: LLMs struggle with large JSON objects. When I asked Q to add internationalization, it would:
- Generate incomplete translation files
- Lose context between different language keys
- Create inconsistent naming conventions

**The Solution**: I broke it down into smaller chunks:
1. First, generate the i18n structure
2. Then, translate page by page
3. Finally, integrate the routing logic

**Aha Moment**: AI tools work best with incremental, focused tasks rather than large, complex operations.

**Key Learning**: **AI is not good at processing large JSON files**. When working with AI on complex features, decompose the problem into smaller, manageable pieces.

### Step 4: Infrastructure as Code (1 hour)

**The Challenge**: Deploy everything with Terraform while keeping the build process integrated.

I could have set up a proper CI/CD pipeline, but honestly, I was feeling lazy and wanted to see how far I could push the "infrastructure as code" concept.

**The Solution**: Embedded the React build process directly in Terraform:

```hcl
resource "null_resource" "build_react_app_with_env" {
  provisioner "local-exec" {
    command = <<-EOT
      cd ../static-website
      npm install
      echo "VITE_CONTACT_FORM_URL=${aws_lambda_function_url.contact_form_url.function_url}" > .env.production
      npm run build
    EOT
  }
  
  depends_on = [aws_lambda_function_url.contact_form_url]
}
```

**Key Learning**: Sometimes the "quick and dirty" solution is perfectly adequate for small projects.

### Step 5: Adding Dynamic Features (1 hour)

**The Challenge**: A static site still needs some dynamic functionality - contact forms and appointment booking.

**The Solutions**:

1. **Contact Form**: Used AWS Lambda + SNS following this excellent guide: [Contact Form: Making Your Website Interactive](https://builder.aws.com/content/31c6EGIZUe9a5eLwMKBv2TuDn2l/contact-form-making-your-website-interactive)

2. **Appointment Booking**: Integrated Microsoft Bookings widget - no custom backend needed!

**Aha Moment**: You don't need to build everything from scratch. Combining static hosting with serverless functions and third-party widgets gives you the best of all worlds.

## The Results: A Personal Success Story

### Performance Improvements
- **Load time**: From 3.2s to 0.8s (75% improvement)
- **Lighthouse Performance**: From 39 to 96 (146% improvement!)
- **Lighthouse Accessibility**: From 89 to 91
- **Lighthouse Best Practices**: From 85 to 100 (perfect score!)
- **Lighthouse SEO**: Maintained at 92
- **Core Web Vitals**: All green across the board

### Cost Reduction
- **Before**: €80/year (shared WordPress hosting)
- **After**: €0/year (AWS free tier covers S3 + CloudFront + Lambda for small sites)
- **Savings**: 100% cost reduction

### Development Experience
The biggest surprise was how enjoyable the development process became. With Q CLI Chat as my pair programming partner, I could:
- Quickly prototype ideas
- Get instant feedback on architecture decisions
- Generate boilerplate code rapidly
- Debug issues with AI assistance

## Key Learnings and "Aha!" Moments

### 1. AI as a Development Accelerator
Q CLI Chat didn't replace my thinking - it amplified it. The best results came when I provided clear context and constraints.

### 2. The Power of Constraints
Being specific about constraints (S3/CloudFront hosting) helped Q generate appropriate solutions. Limiting myself to S3/CloudFront hosting forced better architectural decisions and resulted in a more performant site.

### 3. AI Struggles with Large Data Structures
**AI is not good at processing large JSON files**. The i18n implementation taught me that LLMs work much better with smaller, focused tasks than complex data transformations.

### 4. Static ≠ Boring
Modern static sites can be incredibly dynamic using:
- Client-side JavaScript for interactivity
- Serverless functions for backend logic
- Third-party APIs for complex features

### 5. Incremental Migration Works
I didn't need to rebuild everything at once. The crawler allowed me to migrate content gradually while preserving SEO value.

## Tips for Future Builders

### 1. Start with Content Audit
Before migrating, catalog what you actually need. You'll be surprised how much WordPress cruft you can eliminate.

### 2. Embrace the JAMstack Philosophy
- **J**avaScript for dynamic functionality
- **A**PIs for backend services  
- **M**arkup for content structure

### 3. Use AI Tools Strategically
- Great for: Boilerplate generation, architecture suggestions, debugging
- Not great for: Large data transformations, complex business logic

### 4. Understand When to Keep AI on a Short Leash
**Critical insight**: You need to understand when you can let the LLM have some leeway and when you need to keep it on a short leash. Complex features like i18n with large JSON files require breaking down into smaller, manageable tasks.

### 5. Plan Your Dynamic Features Early
Identify what truly needs server-side processing vs. what can be handled client-side or via third-party services.

### 6. Don't Overthink the Build Process
My Terraform-embedded build process isn't "best practice," but it works perfectly for a small site. Optimize when you need to, not because you should.

## The AWS Services That Made It Possible

- **S3**: Static file hosting (5GB free tier, then $0.023/GB/month)
- **CloudFront**: Global CDN (1TB free tier, then $0.085/GB)
- **Route 53**: DNS management ($0.50/hosted zone/month)
- **Lambda**: Contact form processing (1M requests free per month)
- **SNS**: Email notifications (1,000 notifications free per month)
- **ACM**: Free SSL certificates (always free)

**Total monthly cost for small business sites**: €0 (within free tier limits)

## Conclusion: The Future is Static (But Smart)

This migration taught me that the future isn't about choosing between static and dynamic - it's about being smart about what needs to be dynamic. 

By combining static hosting with serverless functions and AI-assisted development, I built a site that's:
- Faster than my old WordPress site
- Cheaper to run
- More secure
- Easier to maintain
- Better for SEO

The best part? Amazon Q CLI Chat made the entire process feel like a conversation rather than a coding marathon. It's not just about the technology - it's about having the right tools to execute your vision efficiently.

If you're running a business website on WordPress, Drupal, or paying premium prices for Webflow, consider making the switch. Your users (and your wallet) will thank you.

---

*Want to see the code? Check out my [GitHub repository](https://github.com/psantus/static-website.terracloud) for the complete implementation.*

*Questions about the migration process? Feel free to [reach out](https://www.terracloud.fr/contact) - I'm always happy to help fellow developers optimize their web presence.*

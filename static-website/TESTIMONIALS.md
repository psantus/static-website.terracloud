# Managing Testimonials

The testimonials on the "Ils nous font confiance" page are managed through a simple JSON file located at:

```
/public/testimonials.json
```

## Adding a New Testimonial

To add a new testimonial, simply add a new object to the JSON array with the following structure:

```json
{
  "id": "unique-identifier",
  "quote": "The testimonial text here...",
  "author": "Author Name",
  "company": "Company Name",
  "avatar": "AB",
  "sector": "Industry Sector",
  "project": "Type of project/service"
}
```

### Field Descriptions:

- **id**: Unique identifier (use lowercase with hyphens)
- **quote**: The testimonial text (keep it concise but impactful)
- **author**: Person's title or name
- **company**: Company name (can be anonymized if needed)
- **avatar**: 2-letter initials for the avatar circle
- **sector**: Industry sector for potential filtering
- **project**: Brief description of the project type

## Example:

```json
{
  "id": "fintech-cto",
  "quote": "TerraCloud a transformé notre infrastructure cloud avec une approche méthodique et des résultats mesurables.",
  "author": "CTO",
  "company": "Fintech Startup",
  "avatar": "CT",
  "sector": "Finance",
  "project": "Infrastructure Cloud"
}
```

## Tips:

- Keep quotes between 100-200 characters for best display
- Use professional titles rather than personal names for privacy
- The avatar should be 2 uppercase letters (initials)
- Testimonials appear in the order they're listed in the JSON file
- The page automatically handles loading states and responsive design

## Deployment:

After editing the JSON file, the changes will be visible immediately on the website without needing to rebuild the application.

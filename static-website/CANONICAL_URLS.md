# Canonical URLs Support

This blog system supports canonical URLs to comply with search engine expectations when content might be republished or not original.

## How it works

### 1. Adding Canonical URLs to Blog Posts

Add a `canonicalUrl` field to any blog post in the JSON files:

```json
{
  "id": "example-post",
  "title": "Example Post",
  "description": "This is an example post",
  "date": "2024-01-01",
  "category": "blog",
  "tags": ["example"],
  "featuredImage": "",
  "slug": "example-post",
  "canonicalUrl": "https://medium.com/@author/original-post-url"
}
```

### 2. SEO Implementation

When a canonical URL is provided:

- **HTML `<link rel="canonical">` tag**: Points to the original source
- **Alternate link**: Points to the current page with `hrefLang` attribute
- **Visual indicator**: Shows a notice to readers about the original publication

### 3. Visual Indicators

Posts with external canonical URLs display a blue notice box at the top:

> ℹ️ This article was originally published on [domain.com]

### 4. Search Engine Compliance

- **Canonical URL**: Tells search engines where the original content lives
- **Alternate URL**: Indicates this is a translated/republished version
- **Proper attribution**: Maintains SEO best practices

## Use Cases

### Original Content
For original content, omit the `canonicalUrl` field. The system will automatically use the current page URL as canonical.

### Republished Content
For content originally published elsewhere (Medium, LinkedIn, etc.), add the `canonicalUrl` pointing to the original source.

### Cross-posted Content
For content published simultaneously on multiple platforms, choose the primary source as the canonical URL.

## File Locations

- **French posts**: `/public/blog/posts-fr.json`
- **English posts**: `/public/blog/posts-en.json`

## Translation Keys

- **French**: `blog.canonicalNotice` = "Cet article a été publié originalement sur"
- **English**: `blog.canonicalNotice` = "This article was originally published on"

## Example Implementation

```json
{
  "id": "architecture-event-driven",
  "title": "Event-Driven Architecture Best Practices",
  "description": "Learn about event-driven architecture patterns",
  "date": "2024-07-04",
  "category": "tech",
  "tags": ["architecture", "events"],
  "featuredImage": "",
  "slug": "architecture-event-driven",
  "canonicalUrl": "https://dev.to/aws-builders/event-driven-architecture-reconcile-notification-and-event-carried-state-transfer-patterns-5697"
}
```

This will:
1. Set the canonical URL to the dev.to article
2. Show a notice to readers
3. Properly attribute the original source
4. Maintain SEO compliance

## Real Examples from TerraCloud Blog

The following posts have been identified with canonical URLs pointing to their original dev.to publications:

- **Event-Driven Architecture**: https://dev.to/aws-builders/event-driven-architecture-reconcile-notification-and-event-carried-state-transfer-patterns-5697
- **Make or Buy? Assemble!**: https://dev.to/psantus/make-or-buy-assemblez--bbn
- **Cloud Agnostic or Cloud Native**: https://dev.to/psantus/cloud-agnostique-ou-cloud-natif--165k
- **Agility: A Matter of Trust**: https://dev.to/psantus/lagilite-une-question-de-confiance-a-construire-300a
- **API Gateway + DynamoDB**: https://dev.to/aws-builders/deploy-a-simple-data-storage-api-with-very-little-code-using-amazon-api-gateway-and-dynamodb-d95

# SEO and Canonical URLs Implementation

## Overview

This project implements automatic SEO meta tags and canonical URL management with support for custom canonical URLs, particularly useful for blog posts.

## Environment Configuration

### Required Environment Variables

Create a `.env.production` file with:

```bash
VITE_BASE_URL=https://web.terracloud.fr
```

For development, you can create a `.env.local` file:

```bash
VITE_BASE_URL=http://localhost:5173
```

## How Canonical URLs Work

### 1. Default Behavior (Self-Canonicalization)

For regular pages, the system automatically generates canonical URLs:

```tsx
// This will generate: <link rel="canonical" href="https://web.terracloud.fr/services" />
<SEO 
  title="Services - TerraCloud"
  description="Our services description"
/>
```

### 2. Custom Canonical URLs

For blog posts or special cases where you want to specify a different canonical URL:

```tsx
// This will use the custom canonical URL instead of self-canonicalization
<SEO 
  title="Blog Post Title"
  description="Blog post description"
  canonical="https://example.com/original-article" // Custom canonical
/>
```

### 3. Blog Posts

Blog posts support canonical URLs through the `BlogPost` interface:

```typescript
interface BlogPost {
  // ... other fields
  canonicalUrl?: string // Optional canonical URL for SEO
}
```

#### Example blog post with custom canonical:

```typescript
{
  id: "republished-article",
  slug: "republished-article",
  title: "Great Article",
  excerpt: "This article was originally published elsewhere",
  // ... other fields
  canonicalUrl: "https://original-site.com/great-article" // Points to original
}
```

#### Example blog post without canonical (self-canonical):

```typescript
{
  id: "original-article",
  slug: "original-article", 
  title: "Our Original Article",
  excerpt: "This is our original content",
  // ... other fields
  // No canonicalUrl field = self-canonical
}
```

## SEO Component Usage

### Basic Usage

```tsx
import SEO from '../components/SEO'

<SEO 
  title="Page Title"
  description="Page description"
/>
```

### Advanced Usage

```tsx
<SEO 
  title="Page Title"
  description="Page description"
  keywords="custom, keywords, here"
  ogImage="https://example.com/custom-image.jpg"
  ogType="article"
  canonical="https://example.com/canonical-url"
  noIndex={false}
/>
```

## Language Support

The system automatically handles:

- `hreflang` attributes for French/English versions
- Proper `og:locale` based on current language
- `x-default` pointing to French version (canonical)

## Implementation Details

### Files Modified/Created:

1. `src/hooks/useCanonicalUrl.ts` - Canonical URL logic
2. `src/components/SEO.tsx` - Reusable SEO component
3. `.env.production` - Environment configuration
4. Updated page components to use SEO component

### Key Features:

- ✅ Environment-based base URL (no hardcoding)
- ✅ Self-canonicalization by default
- ✅ Custom canonical URL support
- ✅ Automatic alternate language URLs
- ✅ Open Graph and Twitter Card support
- ✅ Proper hreflang implementation
- ✅ Blog post canonical URL support

## Migration Guide

To update existing pages:

1. Replace `import { Helmet } from 'react-helmet-async'` with `import SEO from '../components/SEO'`
2. Replace `<Helmet>` blocks with `<SEO>` component
3. For blog posts, use the `canonical` prop when needed

### Before:
```tsx
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="Description" />
</Helmet>
```

### After:
```tsx
<SEO 
  title="Page Title"
  description="Description"
/>
```

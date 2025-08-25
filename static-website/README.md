# TerraCloud Static Website

A modern, static website built with React, TypeScript, and Tailwind CSS, designed to be hosted on AWS S3 and distributed via CloudFront.

## 🚀 Features

- **Modern Stack**: React 18 + TypeScript + Tailwind CSS
- **Static Generation**: Optimized for S3 hosting
- **Blog System**: Markdown-based blog posts
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Code splitting and optimized bundles

## 📁 Project Structure

```
static-website/
├── public/
│   ├── blog-posts/          # Markdown blog posts
│   ├── blog-images/         # Blog post images
│   └── logo-orange.png      # Logo files
├── src/
│   ├── components/          # Reusable components
│   ├── data/               # Blog data and utilities
│   ├── pages/              # Page components
│   │   └── services/       # Service-specific pages
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
└── vite.config.ts
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd static-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📝 Managing Blog Posts

### Adding a New Blog Post

1. **Create the markdown file** in `public/blog-posts/`:
```bash
touch public/blog-posts/my-new-post.md
```

2. **Add the post metadata** to `src/data/blogPosts.ts`:
```typescript
{
  id: 'unique-id',
  slug: 'my-new-post',
  title: 'My New Post Title',
  excerpt: 'Brief description of the post...',
  content: '', // Will be loaded from markdown
  author: 'Paul Santus',
  publishedAt: '2024-01-15',
  category: 'tech', // 'tech', 'opinion', or 'blog'
  tags: ['aws', 'cloud', 'devops'],
  image: '/blog-images/my-new-post.jpg', // Optional
  readingTime: 5 // Estimated reading time in minutes
}
```

3. **Write your content** in the markdown file:
```markdown
# My New Post Title

Your content here with full markdown support...

## Subheading

- Lists
- Code blocks
- Links
- Images

```javascript
// Code examples
console.log('Hello World');
```
```

### Blog Post Features

- **Markdown Support**: Full GitHub Flavored Markdown
- **Syntax Highlighting**: Code blocks with language support
- **SEO Optimization**: Automatic meta tags and structured data
- **Categories & Tags**: Organize and filter posts
- **Reading Time**: Automatic estimation
- **Responsive Images**: Optimized for all devices

## 🎨 Customization

### Colors

The site uses a custom color palette defined in `tailwind.config.js`:

- `terracloud-orange`: #ff6900
- `terracloud-blue`: #0693e3
- `terracloud-dark`: #1a1a1a
- `terracloud-gray`: #666666

### Fonts

- **Headings**: Outfit (Google Fonts)
- **Body**: Poppins (Google Fonts)

### Logo

Replace the logo files in the `public/` directory:
- `logo-orange.png` - Main logo
- `logo-white.png` - White version for dark backgrounds

## 🏗️ Building for Production

1. **Build the project**:
```bash
npm run build
```

2. **Preview the build**:
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

## ☁️ AWS Deployment

### S3 + CloudFront Setup

1. **Create an S3 bucket** for static website hosting
2. **Upload the `dist/` contents** to the bucket
3. **Create a CloudFront distribution** pointing to the S3 bucket
4. **Configure custom error pages** for SPA routing:
   - Error Code: 403, Response Page: `/index.html`, Response Code: 200
   - Error Code: 404, Response Page: `/index.html`, Response Code: 200

### Automated Deployment

You can automate deployment using GitHub Actions or similar CI/CD tools:

```yaml
# Example GitHub Action
name: Deploy to S3
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - run: aws s3 sync dist/ s3://your-bucket-name --delete
      - run: aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 📊 Performance

The site is optimized for performance:

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Images and fonts optimized
- **Caching**: Proper cache headers for static assets

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to TerraCloud.

## 📞 Support

For questions or support, contact:
- Email: contact@terracloud.fr
- Website: https://www.terracloud.fr

---

**TerraCloud** - Les deux pieds sur terre, la tête dans le Cloud ☁️

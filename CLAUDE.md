# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run serve` - Start local development server on port 3000
- `npm run validate` - Validate project structure, check file integrity, and get performance optimization suggestions

### Deployment
- `npm run deploy` - Full deployment to EdgeOne Pages (recommended for production)
- `npm run deploy-single` - Single HTML file deployment for quick testing
- `npm run build` - No-op command (static site, no build process needed)

### Environment Variables
- `EDGEONE_PAGES_API_TOKEN` - EdgeOne Pages API token (optional, creates temporary links without it)
- `EDGEONE_PAGES_PROJECT_NAME` - Project name for deployment (defaults to "lovemoney-game")

## Architecture

### Project Structure
This is a static website for LoveMoney Game with EdgeOne Pages MCP deployment integration:

- **Single-page application**: All content in `index.html` (67KB)
- **Asset files**: Four PNG game screenshots (10002.png, 10003.png, 10004.png, 10005.png)
- **Deployment system**: Custom Node.js scripts using EdgeOne Pages MCP
- **SEO optimization**: Complete meta tags, structured data, and social media integration

### Key Components

#### Deployment Architecture
- **EdgeOne Pages MCP**: Tencent Cloud deployment service integration
- **Two deployment modes**:
  - Stdio mode (`mcp-config.json`) - Full API integration with token
  - HTTP mode (`mcp-config-http.json`) - Simplified deployment without token
- **Exclusion patterns**: Automatically excludes development files during deployment

#### HTML Structure
- **Comprehensive SEO**: Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Performance optimized**: Preconnect hints, DNS prefetch, font optimization
- **Responsive design**: Mobile-first approach with proper viewport configuration

### Deployment Workflow
1. `validate.js` checks project integrity and provides optimization suggestions
2. `deploy.js` handles full project deployment with all assets
3. `deploy-single.js` provides quick single-file deployment for testing
4. Both deployment scripts use EdgeOne Pages MCP for cloud deployment

## Development Guidelines

### HTML/CSS Standards (from .cursorrules)
- Use semantic HTML elements and proper ARIA accessibility
- External stylesheets only, no inline styles
- Mobile-first responsive design with Flexbox/Grid
- BEM methodology for CSS class naming
- Ensure sufficient color contrast and keyboard navigation

### File Management
- Game screenshots should be optimized for web delivery
- Run `npm run validate` before deployment to check file sizes and optimization
- Static assets are automatically included in full deployment

### SEO Considerations
- Canonical URL points to sugarsugargame.fun (verify this matches actual domain)
- Structured data includes software application schema for app stores
- All meta tags should be updated if branding or URLs change

## Project Context
- **Game**: LoveMoney - Strategic finance management simulator
- **Publisher**: SugarSugar Game Studio
- **Platform**: Windows PC game with web presence
- **Download**: GitHub releases integration (check download links in structured data)
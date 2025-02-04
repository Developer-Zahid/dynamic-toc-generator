# Dynamic Table of Contents Generator

A lightweight, jQuery-based Table of Contents generator that automatically creates a dynamic navigation menu from H2 headings in your content.
[Demo Preview On Codepen](https://codepen.io/DeveloperZahid/full/VYZqgge)

## Features

- 🚀 Automatically generates TOC links from H2 headings
- 📜 Smooth scrolling to sections
- 🎯 Active section tracking during scrolling
- 🔗 URL hash updates without page reload
- 🎨 Customizable via data attributes
- 📱 Responsive and mobile-friendly
- ✨ Handles duplicate heading text
- 🔄 Supports multiple TOC instances on one page


## Installation

1. Add the Dynamic Table of Contents Generator script to your project after jQuery script.
```
<script src="https://cdn.jsdelivr.net/gh/Developer-Zahid/dynamic-toc-generator@latest/assets/js/script.min.js" defer></script>
```

## Usage

### Basic Structure

Your HTML should follow this basic structure:

```html
<div data-toc-element="wrapper">
    <div data-toc-element="list"></div>
    <div data-toc-element="article">
        <h2>Your Heading 1</h2>
        <p>Content...</p>
        <h2>Your Heading 2</h2>
        <p>Content...</p>
    </div>
</div>
```

### Data Attributes

Copy and use these data attributes to configure your Table of Contents:

```html
<!-- Wrapper Element -->
<div data-toc-element="wrapper">

<!-- List Container -->
<div data-toc-element="list"
     data-toc-link-class="your-link-class"
     data-toc-active-class="your-active-class"
     data-toc-scroll-top-offset="100"
     data-toc-scroll-duration="400">
</div>

<!-- Content Container -->
<article data-toc-element="article">
```

#### Available Data Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `data-toc-element="wrapper"` | Main wrapper element | Required |
| `data-toc-element="list"` | Container for TOC links | Required |
| `data-toc-element="article"` | Content container with H2 headings | Required |
| `data-toc-link-class` | CSS class for TOC links | "toc-link" |
| `data-toc-active-class` | CSS class for active TOC link | "active" |
| `data-toc-scroll-top-offset` | Offset from top when scrolling (in pixels) | 0 |
| `data-toc-scroll-duration` | Scroll animation duration (in milliseconds) | 400 |

### Example with All Options

```html
<main data-toc-element="wrapper">
    <aside>
        <div data-toc-element="list"
             data-toc-link-class="list_link"
             data-toc-active-class="cc-active"
             data-toc-scroll-top-offset="100"
             data-toc-scroll-duration="800">
        </div>
    </aside>
    <article data-toc-element="article">
        <!-- Your content with H2 headings -->
        <h2>Example Heading 1</h2>
        <h2>Example Heading 2</h2>
    </article>
</main>
```

### Generated Output

```html
<main data-toc-element="wrapper">
    <aside>
        <div data-toc-element="list"
             data-toc-link-class="list_link"
             data-toc-active-class="cc-active"
             data-toc-scroll-top-offset="100"
             data-toc-scroll-duration="800">
            <button type="button" class="list_link cc-active" data-href="#example-heading-1">Example Heading 1</button>
            <button type="button" class="list_link" data-href="#example-heading-2">Example Heading 2</button>
        </div>
    </aside>
    <article data-toc-element="article">
        <!-- Your content with H2 headings -->
        <h2 id="#example-heading-1" >Example Heading 1</h2>
        <h2 id="#example-heading-2" >Example Heading 2</h2>
    </article>
</main>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 and above

## Dependencies

- jQuery 3.x

## Author

[Developer-Zahid](https://github.com/Developer-Zahid)

## License

MIT License

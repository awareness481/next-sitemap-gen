## Sitemap generation for Next.js projects

**Experimental**

### Installation

`$ npm i next-sitemap-gen -D`

### Usage

You can use it as npm script

```js
scripts: {
    sitemap: 'next-sm-gen http://domain.com/'
}
```

and then in your terminal    
`$ npm run sitemap`  

The file will be located on your project's public folder.
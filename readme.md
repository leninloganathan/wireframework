# Wireframework

A framework for creating wireframe prototypes. Make use of the built in annotation system, the [swig template system](http://paularmstrong.github.io/swig/) ([with Markdown](https://www.npmjs.org/package/gulp-swig) support) and use everything from [Twitter Bootstrap](http://getbootstrap.com).

## Setup
```
bower install
npm install
gulp
```

## Now what?
When `gulp` is running you can edit the stuff in the `src` directory and view the website on <a href="http://0.0.0.0:3000">0.0.0.0:3000</a>. You can define your own structure (when you do, edit `gulpfile.js` to reflect your changes), but this is the way it is setup out of the box:

    /_layouts (swig layouts)
    /images (all your images)
    /javascript (all your JavaScript)
    /pages (all the HTML pages besides index.html)
    /styles (all the (sass) styles)
    /index.html (the index page)


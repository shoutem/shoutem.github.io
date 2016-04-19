---
layout: doc
permalink: /docs/getting-started/development-environment
---

# Development environment
<hr />

Before we start making Shoutem extensions, let's set development environment. Download Shoutem [Command Line Interface](https://www.npmjs.com/package/shoutem-cli) tool which is available through `npm`, package management system for `Node.js`.

<blockquote>
  <p>Note</p>
  <footer>In case you don't have `npm` configured, the best way to do it is with [installing](https://nodejs.org/en/download/) `Node.js`, which includes `npm`.</footer>
</blockquote>

Once you have `npm` installed, write:

```
npm install -g shoutem-cli
``` 

Flag ```-g``` is to install shoutem globally, so you can use it from any folder.

<hr />

Each Shoutem user can become Shoutem developer. Register your developer name with:

```
shoutem register
```

Follow the questionnaire that will appear. Enter your Shoutem credentials and specify desired developer name.

For writing extensions, you need an editor. Use **editor of your choice**.

<nav>
  <ul class="pager">
    <li class="previous">
      <a href="http://shoutem.github.io/docs/getting-started/introduction"><span aria-hidden="true">&larr;</span> Previous</a>
    </li>
    <li class="next">
      <a href="http://shoutem.github.io/docs/getting-started/initializing-extension">Next <span aria-hidden="true">&rarr;</span></a>
    </li>
  </ul>
</nav>
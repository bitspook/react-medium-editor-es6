# react-medium-editor-es6
ES6 version of React wrapper for [medium-editor](https://github.com/daviferreira/medium-editor)

This repository is a fork of the original [react-medium-editor](https://github.com/wangzuo/react-medium-editor) react-wrapper by @wangzuo

## Installation
``` sh
npm install react-medium-editor-es6 --save
```

However, since this package exports an ES6 class, you'll need to load this with an appropriate handler (e.g babel). Here's an example of how you can do that if you're using webpack. Doing this with browserify is similar:

```js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: ([
                    /react-medium-editor-es6\/src/,
                    path.resolve(__dirname, 'src'),
                ]),
                loader: 'babel',
            }
        ]
    }
}
```

And you're good to go. This package is very little amount of code, so if you find some feature missing, just clone this repostory and `npm link` this package. No pesky rebuilding required for development.

## Usage
``` javascript
import React, {
    Component,
} from 'react';

// load theme styles with webpack
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import MediumEditor from 'react-medium-editor-es6';

class App extends Component {
    render() {
        return (
            <div>
                <MediumEditor
                    tag='pre'
                    flushEditorDOM={shallFlushEditorDOM}
                    text={'content'}
                    options={
                        ...mediumOptions,
                    }
                    onChange={handleChangeEditorContent}
                />
            </div>
        );
    }
}
```

### Props

- **tag** (string): Name of the HTML element which will be created for this component. In the above example, a `<pre></pre>` element will be creaed and handed over to Medium editor
- **text** (string): The content of the editor. It can be HTML content
- **options** (object): [Medium editor options](https://github.com/yabwe/medium-editor#mediumeditor-options)
- **onChange** (function): Callback which will be called when user changes the editor content
- **flushEditorDOM** (boolean): An interesting problem I faced when no using any internal state was that normal `Undo` operation won't work, since react would re-render the component, set new editor content, and for the browser, the `undo` is lost. So because I am lazy, I decided to not write to DOM at all. I mean it does write to DOM, but not to the knowledge of react. This means that `props.text` don't change the actual content of the Editor. To do so, you need to pass `flushEditorDOM=true`. There's probably a better way to do this, feel free to fork and create a PR may be; or you can wait for me to solve it which might or might not happen depending on whether I see it as a problem at some point or not.

## Why the fork?

Well, mostly because:

- I am a prick. I should have modified the code and created a pull request instead, but I didn't. Because I am prick.
- I had some propblems integrating the original component in my redux app, had to change some stuff and I didn't like all the `build`ing that was required. ES6 modules will be here soon anyway and it's much easier to work with them directly rather than requiring to build in 2 places (first the component, then the app) imo, so I forked it to an ES6 version
- This component has some differences than the original component. We strictly use `props`, no internal state, and pay for the consequences too.

## License
MIT

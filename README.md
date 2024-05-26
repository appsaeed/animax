# Animax
### Animax is a Comprehensive CSS Animation Library for Seamless Integration in JavaScript Projects

Animax is a versatile CSS animation library that supports various animations. It can be seamlessly implemented in client-side JavaScript projects, including Vite, React, and vanilla JavaScript. With Animax, adding dynamic motion to your web applications is effortless and efficient.

# Installation
You can install Animax using npm:
```sh
npm install animax
```
# Usage
Importing Animax for animation
```js
import { createAnimate } from 'animax';

const element = document.getElementById('animate-me');

createAnimate({
    element,
    motion: 'bounce', // bunch animation
    duration: '2s', // default duration 1s
    infinite: true // css infinite default is false
});
```
Fade animation

```js
import { createAnimate } from 'animax';

const element = document.getElementById('animate-me-once');

createAnimate({
    element,
    motion: 'fadeIn',
    duration: '1s',
    once: true // animate start when observed the element ( when unvisible and visible again )
});
```
## Using in ReactJS application
```js
function App() {
  const element = useRef(null);

  useEffect(() => {
    const animax = createAnimate({
      element: element.current,
      //...
    });

    return () => {
      animax.cleanup();
    };
  }, [element]);

  return <div ref={element}>Animax css animation</div>;
}

export default App;
```

# License
Animax is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Links
Animax on GitHub
Animax Documentation
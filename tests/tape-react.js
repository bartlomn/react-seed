import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';

const test = addAssertions(tape, {jsxEquals});

// Component to test
import Foo from './../src/Foo';

test('----- React Component Tests: Foo -----', (t) => {

  // Shallow rendering: Render React element only *one* level deep
  const component = createComponent.shallow(<Foo label="Dog"/>);

  // Test component props and content
  t.equal(
    component.props.className,
    'default-local-class default-prop-class',
    'className prop of component should equal "default-local-class default-prop-class"');
  // t.equal(component.text, 'share', 'Label props of component should be rendered as Button text "share"');

  // Test rendered output
  const renderer = createRenderer();
  renderer.render(<Foo label="Dog"/>);
  const result = renderer.getRenderOutput();
  t.jsxEquals(result,
    <div className="default-local-class default-prop-class">
      <h1>Hello, this is Dog.</h1>
      Count is 0
    </div>
  );

  t.end();
});

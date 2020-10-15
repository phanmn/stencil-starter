import { Component, h } from '@stencil/core';

@Component({
  tag: 'hello-stencil',
  styleUrl: 'hello-stencil.styl',
})
export class HelloStencil {
  render() {
    return (
      <div>
        <p>Hello Stencil!</p>
      </div>
    );
  }
}

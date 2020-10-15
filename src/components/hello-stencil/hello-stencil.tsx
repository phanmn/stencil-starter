import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'hello-stencil',
  styleUrl: 'hello-stencil.styl',
  assetsDirs: ['assets'],
})
export class HelloStencil {
  render() {
    return (
      <div>
        <p>Hello Stencil!</p>
        <svg-render src={getAssetPath(`./assets/speech-bubble.svg`)}></svg-render>
      </div>
    );
  }
}

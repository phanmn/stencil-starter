import { Component, Prop, h, State, Watch } from '@stencil/core';
import { memoize } from 'lodash-es';

@Component({
  tag: 'svg-render',
  shadow: true,
})
export class SvgRender {
  @Prop() src: string;
  @Prop() width: number = 0;
  @Prop() height: number = 0;
  @State() svgContent: string = '';
  @State() svgAttriutes = {
    width: 0,
    height: 0,
  };

  @State() svgElement: SVGElement;

  componentWillLoad() {
    return this.createSvgElement();
  }

  async createSvgElement() {
    let responseText = await memoizedGetSvgFile(this.src);
    const domParser = new DOMParser();
    let elementSvg = domParser.parseFromString(responseText, 'text/xml');
    let attributes = {};
    let el = elementSvg.documentElement;
    for (let i = 0; i < elementSvg.documentElement.attributes.length; i++) {
      let attrib = el.attributes[i];
      attributes[attrib.name] = attrib.value;
    }

    this.svgAttriutes = attributes as any;
    if (this.width) {
      this.svgAttriutes.width = this.width;
    }

    if (this.height) {
      this.svgAttriutes.height = this.height;
    }

    this.svgContent = elementSvg.documentElement.innerHTML;
  }

  @Watch('svgElement')
  onChangeSvgElement() {
    this.svgElement.innerHTML = this.svgContent;
  }

  render() {
    return (
      <svg ref={(el) => this.svgElement = el as SVGElement} {...this.svgAttriutes}></svg>
    );
  }
}

let memoizedGetSvgFile = memoize(getSvgFile);
function getSvgFile(path) {
  const dir = window.location.origin;
  let source = path.match(/^http(s?):\/\//) ? path : path.substring(0, 1) === '/' ? `${dir}${path}` : `${dir}/${path}`;

  /*
  return fetch(source)
    .then((response) => {
      return response.text();
    });
  */

  let p = new Promise<string>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', source, true);
    request.onload = async () => {
      if (request.status >= 200 && request.status < 400) {
        resolve(request.responseText);
      } else {
        reject(new Error(`Can't load element from this path.\nPath : ${source}`));
      }
    };

    request.onerror = () => {
      reject(new Error(`Can't load element from this path.\nPath : ${source}`));
    };

    request.send();
  });

  return p;
}

import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import DocCardList from "@theme/DocCardList";
import { RoughNotation as R } from "react-rough-notation";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "highlight" tag to our <Highlight /> component!
  // `Highlight` will receive all props that were passed to `highlight` in MDX
  YouTube: LiteYouTubeEmbed,
  DocCardList: DocCardList,
  strong: (props) => {
    return (
      <R type="highlight" color="#fcf3a4" show={true} multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  u: (props) => {
    return (
      <R type="underline"  color="#2196F3" strokeWidth="2" show={true} multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  b: (props) => {
    return (
      <R type="underline" color="#2196F3" strokeWidth="1" show={true} multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  box: (props) => {
    return (
      <R type="box" color="gray" show={true} strokeWidth="2" animate={false}>
        {props.children}
      </R>
    );
  },
  circle: (props) => {
    return (
      <R type="circle" color="red" show={true} strokeWidth="2" multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  st: (props) => {
    return (
      <R type="strike-through" show={true} multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  x: (props) => {
    return (
      <R type="crossed-off" color="red" show={true} multiline={true} animate={false}>
        {props.children}
      </R>
    );
  },
  rb: (props) => {
    return (
      <R type="bracket" color="black" show={true} animate={false}>
        {props.children}
      </R>
    );
  },
  lb: (props) => {
    return (
      <R type="bracket" brackets={["left"]} color="red" show={true} animate={false}>
        {props.children}
      </R>
    );
  },
  ub: (props) => {
    return (
      <R type="bracket" brackets={["bottom"]} color="gray" strokeWidth="2" show={true} animate={false}>
        {props.children}
      </R>
    );
  },
};

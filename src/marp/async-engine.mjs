import { Marp } from "@marp-team/marp-core";
import markdownItMark from "markdown-it-mark";
import markdownItContainer from "markdown-it-container";
import markdownItReplaceLink from "markdown-it-replace-link";
import link from "markdown-it-external-links";
import marpMermaid, { postProcessor } from "./marp-mermaid-plugin.mjs";
import modulConfig from "../../modul.config.js";

/*
 * Custom Marp engine with async post-processing
 * Useful for async rendering
 * https://github.com/markdown-it/markdown-it/issues/248
 */
class PostprocessMarpitEngine extends Marp {
  constructor(options, postprocess) {
    super(options);
    this.postprocess = postprocess;
  }

  withPostprocess(postprocess) {
    this.postprocess = postprocess;
    return this;
  }

  async render(markdown, env = {}) {
    const { html, css, comments } = super.render(markdown, env);
    if (this.postprocess) {
      return await this.postprocess(markdown, env, html, css, comments);
    } else {
      return { html, css, comments };
    }
  }
}

export default async (constructorOptions) => {
  return new PostprocessMarpitEngine(constructorOptions)
    .use(markdownItMark)
    .use(markdownItContainer, "info")
    .use(markdownItContainer, "footnotes", {
      render: function (tokens, idx) {
        let className = tokens[idx].info
          .trim()
          .match(/^\s?footnotes(\s+(.*))?$/);
        if (tokens[idx].nesting === 1)
          return `<div class="footnotes ${className[1]}">`; // left/right as second classes
        return "</div>\n";
      },
    })
    .use(markdownItContainer, "columns", {
      render: function (tokens, idx) {
        let className = tokens[idx].info.trim().match(/^\s?columns(\s+(.*))?$/);
        if (tokens[idx].nesting === 1)
          return `<div class="columns ${className[1]}"><div>\n`;
        return "</div></div>\n";
      },
    })
    .use(markdownItContainer, "split", {
      render: function (tokens, idx) {
        let className = tokens[idx].info.trim().match(/^\s?split(\s+(.*))?$/);
        if (tokens[idx].nesting === 1)
          return `</div><div class="${className[1]}">\n`;
        return "</div></div>\n";
      },
    })
    .use(markdownItReplaceLink, {
      replaceLink: function (link, env, token, htmlToken) {
        const url = process.env.CI
          ? `${modulConfig.url}/${modulConfig.repoName}/docs`
          : `http://localhost:4000/${modulConfig.repoName}/docs`;
        return link.replace(/\/docs|\.\.\/docs/, url);
      },
    })
    .use(link, {
      externalTarget: "_blank",
      externalRel: "noopener noreferrer",
    })
    .use(marpMermaid)
    .withPostprocess(postProcessor);
};

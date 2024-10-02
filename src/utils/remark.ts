import { findAfter } from "unist-util-find-after";
import { visit, Visitor } from "unist-util-visit";
import type { Root, Node, Heading, Parent, RootContent } from "mdast";

const MAX_HEADING_DEPTH = 6;

export const remarkSectionize = () => {
  return transform;
};

function transform(tree: Root) {
  for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
    visit(
      tree,
      (node: Node): node is Heading => {
        return node.type === "heading" && (node as Heading).depth === depth;
      },
      sectionize
    );
  }
}

const sectionize: Visitor<Heading> = (node, index, parent) => {
  if (!parent || typeof index !== "number") {
    return;
  }

  const start = node;
  const startIndex = index;
  const depth = start.depth;

  const isEnd = (node: Node): boolean => {
    if (node.type === "heading") {
      const hNode = node as Heading;
      return hNode.depth <= depth;
    }

    return node.type === "export";
  };
  const end = findAfter(parent, start, isEnd); // parent의 start 다음부터 isEnd가 true일 때까지 iteration
  if (!end) {
    return;
  }

  const endIndex = parent.children.indexOf(end);
  console.log(end, endIndex);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined
  );

  const contentOfHeader =
    node.children[0].type === "text" ? node.children[0].value : "";

  const section = {
    type: "section",
    depth: depth,
    children: between,
    data: {
      hName: "section",
      hProperties: {
        "aria-labelledby": convertHeaderContentToId(contentOfHeader),
        "data-content": true,
      },
    },
  };

  parent.children.splice(startIndex, section.children.length, section);
};

export const convertHeaderContentToId = (content: string) => {
  return content
    .toLowerCase()
    .replace(
      /[^\w\s\u4E00-\u9FFF\uAC00-\uD7A3\u3130-\u318F\u3040-\u30FF\u00C0-\u024F\u1E00-\u1EFF-]/g,
      ""
    ) // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

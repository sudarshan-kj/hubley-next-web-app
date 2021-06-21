import React from "react";

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module "*.jpg" {
  export default "" as string;
}
declare module "*.png" {
  const content: JSX.Element;
  export default content;
}

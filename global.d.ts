declare module "*.module.css";
declare module "*.module.scss";

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.jpeg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

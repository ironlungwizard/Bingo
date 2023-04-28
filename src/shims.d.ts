declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  declare module "*.jpg";
  declare module "*.svg?url"{
    const content: any;
    export default content;
  }
  
  declare module '*.svg' {
    const content: any
    export default content
  }
  
  
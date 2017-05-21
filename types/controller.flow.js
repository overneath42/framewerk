declare type ConfigObject = {
  [key: string]: string
}

declare type MethodObject = {
  [key: string]: Function
}

declare interface Controller$Interface {
  name: string;
  selectors: ConfigObject;
  events: MethodObject;
  methods: MethodObject;
  container: string;
}

declare interface Controller$Api {

}
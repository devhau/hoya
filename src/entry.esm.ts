import { App, Plugin } from 'vue';
// Import vue components
import * as components from '@/components/index';
import * as directives from '@/directives/index';
import * as constants from '@/constants/index';

import './_entry.scss';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "highlight.js/scss/default.scss";
// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installDevhauVueUi(app: App, options: any) {
  Object.entries(directives).forEach(([directiveName, directive]) => {
    app.directive(directiveName, directive);
  });
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
  if (options === undefined) {
    Object.entries(constants).forEach(([constantName, constant]) => {
      app.config.globalProperties[`$${constantName}`] = constant;
    });
  } else {
    Object.entries(constants).forEach(([constantName, constant]) => {
      app.config.globalProperties[`$${constantName}`] = constant;
    });
    if (options.global !== undefined) {
      Object.entries(options.global).forEach(([constantName, constant]) => {
        app.config.globalProperties[`$${constantName}`] = constant;
      });
    }
  }
  app.provide(constants.System.provide, app.config.globalProperties);
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index';
export * from '@/extends/index';

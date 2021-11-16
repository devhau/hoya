import { nextTick } from "vue";
export const Focus = {
  beforeMount(el: any) {
    nextTick(() => {
      if (el && el.focus) {
        el.focus();
      }
    });
  }
};

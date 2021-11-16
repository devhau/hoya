import { checkEvent } from "@/utils/event.util";
import { nextTick } from "vue";

export const ClickOutside = {
  mounted(el: any, binding: any) {
    const action = (binding.value?.action) ?? binding.value;
    const app = binding.instance;
    el.clickOutsideEvent = (event: any) => {
      if (checkEvent(event, el) && action) {
        action(event, el, app);
      }
    };
    if (action) {
      nextTick(() => {
        if (el.focus) el.focus();
        document.body.addEventListener('click', el.clickOutsideEvent);
      })
    }
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};

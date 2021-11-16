import { checkEvents, convertKeyToArr } from "@/utils/event.util";

export const Command = {
  beforeMount(el: any, binding: any) {
    const CommandKey = binding.value?.key;
    if (CommandKey === undefined || CommandKey.trim().length === 0) return;
    const app = binding.instance;
    const arKeys = convertKeyToArr(CommandKey);
    el.CommandEvent = (event: any) => {
      if (binding.value?.do && checkEvents(event, arKeys)) {
        binding.value.do(event, el, app);
      }
    };
    if (document && document.body) {
      document.addEventListener('keydown', el.CommandEvent);
    }
  },
  unmounted(el: any) {
    if (document && document.body) {
      document.removeEventListener('keydown', el.CommandEvent);
    }
  },
};

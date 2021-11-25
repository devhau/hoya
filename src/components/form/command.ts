import { defineComponent, h, onBeforeMount, onUnmounted } from 'vue';
import { checkEvents, convertKeyToArr } from "@/utils";
export const vhCommand = defineComponent({
    name: 'vh-command',
    emits: ['doCommand'],
    props: {
        keyCommand: {
            type: String,
        }
    },
    setup(props: any, { emit }) {
        const { keyCommand } = props;
        const arKeys = convertKeyToArr(keyCommand);
        const commandEvent = (event: any) => {
            if (checkEvents(event, arKeys)) {
                emit('doCommand');
            }
        };
        onBeforeMount(() => {
            if (document && document.body) {
                document.addEventListener('keydown', commandEvent);
            }
        });
        onUnmounted(() => {
            if (document && document.body) {
                document.removeEventListener('keydown', commandEvent);
            }
        });
        return () => h('input', { name: 'key-command', type: 'hidden', value: keyCommand });
    }
});

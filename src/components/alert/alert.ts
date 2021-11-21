import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhAlert = defineComponent({
    name: 'vh-alert',
    props: {
        class: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'primary'
        }
    },
    render() {
        const { class: classProps, type }: any = this;
        let className = 'alert';
        className = makeClassByName(className, 'alert', type);
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div',
            {
                class: className,
            },
            this.$slots);
    }
});
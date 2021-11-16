import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';

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
        className = makeTextClass(className, 'alert', type);
        className = makeTextClass(className, '', classProps, '');
        // return the render function
        return h('div',
            {
                class: className,
            },
            this.$slots);
    }
});
import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';

export const vhBadge = defineComponent({
    name: 'vh-badge',
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
        let className = 'badge';
        className = makeTextClass(className, 'badge', type);
        className = makeTextClass(className, '', classProps, '');
        // return the render function
        return h('div',
            {
                class: className,
            },
            this.$slots);
    }
});
import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

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
        className = makeClassByName(className, 'badge', type);
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div',
            {
                class: className,
            },
            this.$slots);
    }
});
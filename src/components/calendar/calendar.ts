import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';

export const vhCalendar = defineComponent({
    name: 'vh-calendar',
    props: {
        class: {
            type: String,
            default: '',
        },
        module: {
            default: null,
        },
    },
    render() {
        const { class: classProps } = this;
        let className = makeTextClass('vh-calendar', '', classProps, '');
        return h('div',
            {
                ...this.$attrs,
                class: className,
            },
            this.$slots
        );
    }
});

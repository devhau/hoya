import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhFooter = defineComponent({
    name: 'vh-footer',
    props: {
        class: {
            type: String,
            default: '',
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'footer';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        });
    },
    methods: {
    },
    mounted() {
    }
});

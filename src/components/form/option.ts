import { h, defineComponent } from 'vue';

export const vhOption = defineComponent({
    name: 'vh-option',
    setup(_, { slots, attrs }) {

        // return the render function
        return () =>
            h('option', {
                ...attrs,
            },
                slots
            );
    }
});

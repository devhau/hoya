import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhViewFiles = defineComponent({
    name: 'vh-view-files',
    props: {
        class: {
            type: String,
            default: '',
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'view-files';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        }, [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, "dfdfdfdfdfdfdfdfdfdfdfdfdf0", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                .map((item) => h('div', {
                    class: 'file-item'
                }, [
                    h('div', { class: 'file-icon' }, h('i', { class: 'bi bi-file-earmark-text-fill' })),
                    h('span', {class:'file-name'}, item)
                ]))

        ]);
    },
    methods: {
    },
    mounted() {
    }
});

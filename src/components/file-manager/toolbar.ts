import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhToolbar = defineComponent({
    name: 'vh-toolbar',
    props: {
        class: {
            type: String,
            default: '',
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'toolbar';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        }, this.folderCurrent);
    },
    methods: {
    },
    mounted() {
    },
    setup() {
        const folderCurrent: any = inject('folderCurrent')
        const folderChoose: any = inject('folderChoose');
        return {
            folderCurrent,
            folderChoose
        }
    }
});

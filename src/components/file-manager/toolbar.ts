import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils';
import { vhButton } from './../button';
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
        }, [
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus', onClick: this.folderUpdate })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-cloud-arrow-up' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
            h('div', { class: 'toolbar-item' },
                h(vhButton, { size: 'sm', beforeIcon: 'bi bi-folder-plus' })
            ),
        ]);
    },
    methods: {
    },
    mounted() {
    },
    setup() {
        const folderCurrent: any = inject('folderCurrent')
        const folderUpdate: any = inject('folderUpdate');
        return {
            folderCurrent,
            folderUpdate
        }
    }
});

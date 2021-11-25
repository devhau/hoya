import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils';

export const vhFileItem = defineComponent({
    name: 'vh-file-item',
    props: {
        class: {
            type: String,
            default: '',
        },
        item: {}
    },
    render() {
        return h('div', {
            class: 'file-item'
        }, [
            h('div', {
                class: 'file-icon'
            }),
            h('div', {
                class: 'file-name'
            }),
        ])
    }
});
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
            this.files.map((item: any) => h(vhFileItem, { item }))
        ]);
    },
    setup() {
        const files: any = inject('files')
        return {
            files
        }
    }
});

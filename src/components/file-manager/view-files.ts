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
        let item: any = this.item;
        let className = 'file-item';
        if (this.filesCurrent && this.filesCurrent.indexOf(item) > -1) {
            className = makeClassByName(className, '', 'active', '');

        }
        return h('div', {
            class: className,
            oncontextmenu: (e: any) => {
                e.preventDefault();
            },
            onClick: (e: any) => {
                e.preventDefault();
                this.fileChoose(item, e.ctrlKey);

            }
        }, [
            h('div', {
                class: 'file-icon'
            },
                [
                    !item.thum && h('i', { class: 'bi bi-file-earmark-text' }),
                    item.thum && h('img', { src: item.thum }),
                    h('span', {}, this.filesCurrent.value)
                ]),
            h('div', {
                class: 'file-name'
            }, `${item.name} (${item.size})`),
        ])
    },
    setup() {
        const filesCurrent: any = inject('filesCurrent');
        const fileChoose: any = inject('fileChoose');

        return {
            filesCurrent,
            fileChoose
        }
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

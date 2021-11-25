import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';
import { vhTreeRoot } from './tree-folder';
import { vhViewFiles } from './view-files';

export const vhBody = defineComponent({
    name: 'vh-body',
    props: {
        class: {
            type: String,
            default: '',
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'body';
        className = makeClassByName(className, '', classProps, '');
        let treeFolderComponent: any = (): any => {
            return h('div', {
                class: 'tree-folders'
            }, h(vhTreeRoot, {}))
        };
        let listFileComponent: any = (): any => {
            return h(vhViewFiles, {
                class: 'list-files'
            })
        };
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        },
            [
                treeFolderComponent(),
                listFileComponent()
            ]);
    },
    methods: {
    },
    mounted() {
    }
});

import { h, defineComponent, ref, provide } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import { vhToolbar } from './toolbar';
import { vhFooter } from './footer';
import { vhBody } from './body';
export const vhFileManager = defineComponent({
    name: 'vh-file-manager',
    props: {
        class: {
            type: String,
            default: '',
        }
    },
    provide: {
        pathCurrent: '/',
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-file-manager';
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        },
            [
                h(vhToolbar, {}),
                h(vhBody, {}),
                h(vhFooter, {})
            ]
        );
    },
    methods: {
    },
    setup() {
        let folderCurrent = ref("/");
        provide('folderCurrent', folderCurrent);
        provide('folderChoose', (_folder: string) => {
            folderCurrent.value = _folder;
        });
        return { folderCurrent };
    }
});

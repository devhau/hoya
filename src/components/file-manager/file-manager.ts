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
        let filesCurrent = ref([]);
        provide('folderCurrent', folderCurrent);
        provide('filesCurrent', folderCurrent);
        provide('folderChoose', (_folder: string) => {
            folderCurrent.value = _folder;
        });
        provide('fileChoose', (_file: never, _isMutil = true) => {
            if (_isMutil) {
                filesCurrent.value.push(_file);
            } else {
                filesCurrent.value = [_file];
            }
        });
        return { folderCurrent, filesCurrent };
    }
});

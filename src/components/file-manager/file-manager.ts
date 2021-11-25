import { h, defineComponent, ref, provide } from 'vue';
import { makeClassByName } from '@/utils';
import { vhToolbar } from './toolbar';
import { vhFooter } from './footer';
import { vhBody } from './body';
export const vhFileManager = defineComponent({
    name: 'vh-file-manager',
    props: {
        class: {
            type: String,
            default: '',
        },
        option: {}
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
    setup(props) {
        let folderCurrent = ref("/");
        let files = ref([]);
        let filesCurrent = ref([]);
        let option: any = props.option;
        provide('folderCurrent', folderCurrent);
        provide('filesCurrent', folderCurrent);
        provide('files', files);
        provide('folderChoose', (_folder: string, callback: any) => {
            option.api.getInfo(_folder).then(({ data }: any) => {
                files.value = data.files as any;
                if (callback) {
                    callback(data.directories);
                }
            })
            folderCurrent.value = _folder;
        });
        provide('folderOpen', (_folder: string, callback: any) => {
            option.api.getInfo(_folder).then(({ data }: any) => {
                if (callback) {
                    callback(data.directories);
                }
            })
            folderCurrent.value = _folder;
        });
        provide('fileChoose', (_file: never, _isMutil = true) => {
            if (_isMutil) {
                filesCurrent.value.push(_file);
            } else {
                filesCurrent.value = [_file];
            }
        });
        return { folderCurrent, filesCurrent, files };
    }
});

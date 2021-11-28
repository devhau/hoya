import { h, defineComponent, ref, provide } from 'vue';
import { makeClassByName } from '@/utils';
import { vhToolbar } from './toolbar';
import { vhFooter } from './footer';
import { vhBody } from './body';
import { vhModal } from './../modal';

const vhFolderUpdate = defineComponent({
    props: {

    },
    render() {
        return h(vhModal, { show: true });
    }
});
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
                this.showFolderUpdate && h(vhFolderUpdate as any, { show: this.showFolderUpdate, title: 'Update' }),
                h(vhToolbar, {}),
                h(vhBody, {}),
                h(vhFooter, {})
            ]
        );
    },
    methods: {
    },
    setup(props) {
        let showFolderUpdate = ref(false);
        let folderUpdate = ref("");
        let folderCurrent = ref({});
        let files = ref([]);
        let filesCurrent = ref([]);
        let option: any = props.option;
        provide('option', option);

        provide('folderCurrent', folderCurrent);
        provide('filesCurrent', filesCurrent);
        provide('files', files);

        provide('folderUpdate', (_folder: any, callback: any) => {
            callback && callback();
            folderUpdate.value = _folder.path;
            showFolderUpdate.value = true;
        });
        provide('folderChoose', (_folder: any, callback: any) => {
            option.api.getInfo(_folder.path).then(({ data }: any) => {
                files.value = data.files as any;
                filesCurrent.value = [];
                if (callback) {
                    callback(data.directories);
                }
            })
            folderCurrent.value = _folder;
        });
        provide('folderOpen', (_folder: any, callback: any) => {
            option.api.getInfo(_folder.path).then(({ data }: any) => {
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
        return { showFolderUpdate, folderUpdate, folderCurrent, filesCurrent, files };
    }
});

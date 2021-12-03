import { h, defineComponent, ref, provide } from 'vue';
import { makeClassByName } from '@/utils';
import { vhToolbar } from './toolbar';
import { vhFooter } from './footer';
import { vhBody } from './body';
import { vhFolderUpdate } from './feature/folder-update';
import { vhUploadFile } from './feature/upload-file';
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
        let folderUpdateCallback: any = this.folderUpdateCallback;
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        },
            [
                this.showUploadFile && h(vhUploadFile,
                    {
                        show: this.showUploadFile,
                        onHide: () => this.showUploadFile = false,
                        onUpload: (files: any) => {
                            this.showUploadFile = false;
                            this.api.uploadFile((this.folderCurrent as any).path, "", files);
                        }
                    }),
                this.showFolderUpdate && h(vhFolderUpdate, {
                    show: this.showFolderUpdate, folder: this.folderUpdate, onHide: () => this.showFolderUpdate = false, onUpdate: () => {
                        folderUpdateCallback && folderUpdateCallback();
                    }
                }),
                h(vhToolbar, {}),
                h(vhBody, {}),
                h(vhFooter, {})
            ]
        );
    },
    methods: {},
    setup(props) {
        //Form For Folder
        let showFolderUpdate = ref(false);
        let folderUpdate = ref({});
        let folderUpdateCallback = ref({});
        let showUploadFile = ref(false);

        //List file from folder current
        let files = ref([]);

        // Choose Files
        let filesCurrent = ref([]);

        let folderCurrent = ref({});
        let folderItemCurrent = ref({});
        let option: any = props.option;
        let { api } = option;

        provide('option', option);

        provide('folderItemCurrent', folderItemCurrent);
        provide('folderCurrent', folderCurrent);
        provide('filesCurrent', filesCurrent);
        provide('files', files);
        provide('uploadFile', () => { showUploadFile.value = true });
        provide('folderUpdate', (_folder: any = undefined, callback: any = undefined) => {
            folderUpdate.value = _folder;
            if (callback == undefined) {
                folderUpdateCallback.value = (() => (folderItemCurrent.value as any).refresh(true, true)) as any;
            } else {
                folderUpdateCallback.value = callback;
            }
            showFolderUpdate.value = true;
        });
        provide('folderChoose', (FolderItem: any, _folder: any, callback: any, selectFile = false) => {
            if (selectFile) {
                folderItemCurrent.value = FolderItem;
            }
            option.api.getInfo(_folder.path).then(({ data }: any) => {
                if (selectFile) {
                    files.value = data.files as any;
                }
                filesCurrent.value = [];
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
        return { api, showFolderUpdate, folderUpdate, folderCurrent, filesCurrent, files, folderUpdateCallback, showUploadFile };
    }
});

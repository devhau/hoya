import { h, defineComponent, ref, provide, inject } from 'vue';
import { makeClassByName } from '@/utils';
import { vhToolbar } from './toolbar';
import { vhFooter } from './footer';
import { vhBody } from './body';
import { vhModal } from '../modal';
import { vhInput } from '../form';
import { vhButton } from '../button';

const vhFolderUpdate = defineComponent({
    props: {
        show: {
            type: Boolean
        },
        folder: {}
    },
    render() {
        let titleFolder: string = 'New Folder';
        let titleButton: string = 'Create';
        let text: any = this.textValue;
        if (!this.isNew) {
            titleFolder = 'Rename Folder';
            titleButton = 'Rename';
        }
        const updateValueText: any = this.updateValueText;
        return h(vhModal, { size: 'sm', show: this.show, title: titleFolder, onHide: () => this.$emit('hide') }, {
            default: [
                h(vhInput as any, {
                    modelValue: text,
                    onChangeValue(value: any) {
                        updateValueText(value);
                    }
                })
            ],
            footer: [
                h(vhButton, { beforeIcon: 'bi bi-check', text: titleButton, size: 'sm', onClick: this.updateForm })
            ]
        });
    },
    methods: {
        updateForm() {
            if (this.isNew) {
                this.api.makeDirectory((this.folderCurrent as any).path, this.valueText).then(() => {
                    this.$emit('update');
                    this.$emit('hide');
                });
            } else {
                this.api.renameDirectory((this.folderCurrent as any).path, this.valueText).then(() => {
                    this.$emit('update', true);
                    this.$emit('hide');
                });
            }
        }
    },
    setup(props) {
        const valueText = ref("");
        const textValue = ref("");
        const isNew = ref(true);
        const updateValueText = (value: any) => {
            valueText.value = value;
        }
        if (props.folder != undefined) {
            textValue.value = (props.folder as any).name;
            isNew.value = false;
        }
        let { api }: any = inject('option');
        let folderCurrent = inject('folderCurrent');
        return { api, textValue, valueText, isNew, updateValueText, folderCurrent };
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
        let folderUpdateCallback: any = this.folderUpdateCallback;
        // return the render function
        return h('div', {
            ...this.$attrs,
            class: className
        },
            [
                this.showFolderUpdate && h(vhFolderUpdate as any, {
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

        //List file from folder current
        let files = ref([]);

        // Choose Files
        let filesCurrent = ref([]);

        let folderCurrent = ref({});
        let folderItemCurrent = ref({});
        let option: any = props.option;

        provide('option', option);

        provide('folderItemCurrent', folderItemCurrent);
        provide('folderCurrent', folderCurrent);
        provide('filesCurrent', filesCurrent);
        provide('files', files);

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
        return { showFolderUpdate, folderUpdate, folderCurrent, filesCurrent, files, folderUpdateCallback };
    }
});


import { h, defineComponent, ref, inject } from 'vue';
import { vhModal } from '@/components/modal';
import { vhInput } from '@/components/form';
import { vhButton } from '@/components/button';
export const vhFolderUpdate = defineComponent({
    name: 'vh-folder-update',
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
import { h, defineComponent, } from 'vue';
import { vhModal } from '@/components/modal';
import { vhFileUpload } from '@/components/form';
import { vhButton } from '@/components/button';
export const vhUploadFile = defineComponent({
    name: 'vh-upload-file',
    props: {
        show: {
            type: Boolean
        },
        title: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: true,
        }
    },
    render() {
        return h(vhModal, { show: this.show, title: this.title, onHide: () => this.$emit('hide') }, {
            default: [
                h(vhFileUpload, {
                    multiple: this.multiple,
                    onChangeFile: (value: any) => {
                        this.files = value;
                        this.$emit('changeFile', value);
                    }
                }),
                this.files && this.files.length > 0 && h('div', { class: 'mt-3' }, [
                    this.files.map((item: any, index: number) =>
                        h('p', {},
                            [
                                item.name,
                                h('i', { class: 'bi bi-x vh-hover', onClick: () => this.files.splice(index, 1) })
                            ]
                        )
                    )
                ])
            ],
            footer: [
                h(vhButton, {
                    disabled: !(this.files && this.files.length > 0),
                    beforeIcon: 'bi bi-upload',
                    text: 'Upload',
                    size: 'sm',
                    onClick: () => {
                        this.$emit('upload', this.files);
                    }
                })
            ]
        });
    },
    data() {
        return {
            files: []
        };
    },
    setup() {
    }
});
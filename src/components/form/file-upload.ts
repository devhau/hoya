import { h, defineComponent, ref, onMounted } from 'vue';
import { makeClassByName } from '@/utils';

export const vhFileUpload = defineComponent({
    name: 'vh-file-upload',
    props: {
        modelValue: {
            default: null,
        },
        class: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: 'Upload your files here'
        },
        icon: {
            type: String,
            default: 'bi bi-cloud-upload'
        },
        showFace: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: true,
        }
    },
    setup(props: any, { emit, attrs, slots }) {
        const refElInput: any = ref(null);
        const refElUpload: any = ref(null);
        const { class: classProps, focusOnStart, label, icon, showFace, multiple } = props;
        let className = makeClassByName('vh-file-upload', '', classProps, '');
        const setValue = (value: Array<any>) => {
            if (value.length > 0) {
                if (multiple) {
                    emit('update:modelValue', value);
                    emit('changeFile', value, this);
                } else {
                    emit('update:modelValue', value[0]);
                    emit('changeFile', value[0], this);
                }
            } else {
                emit('update:modelValue', undefined);
                emit('changeFile', undefined, this);
            }
        }
        onMounted(() => {
            if (focusOnStart) {
                refElInput.value.focus();
            }
        });
        // return the render function
        return () =>
            h('div', {
                ...attrs,
                ref: refElUpload,
                class: className,
                onClick: () => {
                    refElInput.value.click();
                },
                ondrop: (ev: any) => {
                    ev.preventDefault();
                    let files = [];
                    if (ev.dataTransfer.items) {
                        // Use DataTransferItemList interface to access the file(s)
                        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                            // If dropped items aren't files, reject them
                            if (ev.dataTransfer.items[i].kind === 'file') {
                                var file = ev.dataTransfer.items[i].getAsFile();
                                files.push(file);
                            }
                        }
                    } else {
                        // Use DataTransfer interface to access the file(s)
                        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
                            var file = ev.dataTransfer.files[i];
                            files.push(file);
                        }
                    }
                    setValue(files);
                    refElUpload.value.classList.remove('file-drap-over');
                },
                ondragover: (ev: any) => {
                    ev.preventDefault();
                    refElUpload.value.classList.add('file-drap-over');
                },
                ondragleave: (ev: any) => {
                    ev.preventDefault();
                    refElUpload.value.classList.remove('file-drap-over');
                }
            }, [
                h(
                    'input',
                    {
                        type: 'file',
                        ref: refElInput,
                        style: 'display:none',
                        multiple,
                        onChange: (e: any) => {
                            setValue([...e.target.files]);
                        },
                    },
                ),
                h('div', {
                    class: 'vh-file-upload__face'
                },
                    showFace && h('div', {
                        class: 'upload-text'
                    },
                        h('p', {}, [h('i', { class: icon }), h('span', {}, label)])
                    )
                ),
                h(slots, {})
            ])
            ;
    }
});

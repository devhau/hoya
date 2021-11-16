import { makeTextClass } from '@/utils/class.util';
import { h, defineComponent, nextTick } from 'vue';
import { vhCommand } from './command';
let commandComponent: any = vhCommand;
export const vhLabelInput = defineComponent({
    name: 'vh-label-input',
    props: {
        modelValue: {
            default: null,
        },
        keyCommand: {
            default: undefined,
        },
        closeOnBlur: {
            type: Boolean,
            default: true,
        },
        editOnDblClick: {
            type: Boolean,
            default: false,
        },
        emptyWhenEdit: {
            type: Boolean,
            default: false,
        },
        modeEdit: {
            type: Boolean,
            default: false,
        },
        enterWhenMutil: {
            type: Boolean,
            default: false,
        },
        mutil: {
            type: Boolean,
            default: false,
        },
        class: {
            default: ''
        },
        classEdit: {
            default: ''
        },
        classLabel: {
            default: ''
        }
    },
    data() {
        return {
            editInput: false, editValue: null,
            labelInput: {},
        }
    },
    mounted() {
        this.editInput = this.modeEdit;
        this.editValue = this.modelValue;
    },
    methods: {
        openEdit() {
            this.editInput = true;
            nextTick(() => {
                if (this.$el) {
                    this.$el.focus();
                }
            });
        },
    },
    render() {
        let { modelValue, keyCommand, closeOnBlur, emptyWhenEdit, class: classPros, classEdit, classLabel, mutil, enterWhenMutil }: any = this;
        let className = makeTextClass('vh-label-input', '', classPros, '');
        // return the render function
        if (this.editInput === true) {
            this.$emit('openEdit', this);
            let valEdit: any = this.editValue;
            let tagEdit = 'input';
            className = makeTextClass(className, '', classEdit, '');
            if (mutil) {
                tagEdit = 'textarea';
            }
            if (emptyWhenEdit) {
                valEdit = undefined;
            }
            return h(tagEdit, {
                ...this.$attrs,
                class: className,
                value: valEdit,
                onInput: (e: any) => {
                    valEdit = e.target.value;
                },
                onChange: (e: any) => {
                    valEdit = e.target.value;
                },
                onKeyup: (e: any) => {
                    if (((mutil && enterWhenMutil == !(e.shiftKey == true)) || !mutil) && e.keyCode === 13) {
                        this.editInput = false;
                        if (valEdit !== '' && valEdit !== undefined) {
                            nextTick(() => {
                                this.$emit('update:modelValue', valEdit);
                                this.$emit('update', valEdit);
                            })
                        }
                        e.preventDefault();
                    } else if (e.keyCode === 27) {
                        this.editInput = false;
                        this.editValue = modelValue;
                        e.preventDefault();
                    }
                },
                onBlur: () => {
                    if (closeOnBlur) {
                        this.editInput = false;
                        this.editValue = modelValue;
                    }
                },
            })
        } else {
            className = makeTextClass(className, '', classLabel, '');
            let childLabel: any = [];
            const { openEdit } = this;
            if (this.editOnDblClick) {
                childLabel = [
                    h('label', {
                        ...this.$attrs,
                        class: className,
                        onDblClick: () => {
                            openEdit();
                        }
                    }, modelValue)
                ];
            } else {
                childLabel = [
                    h('label', {
                        ...this.$attrs,
                        class: className,
                        onClick: () => {
                            openEdit();
                        }
                    }, modelValue)
                ];
            }
            if (keyCommand !== undefined && keyCommand !== '') {
                childLabel = [
                    h(commandComponent, {
                        keyCommand,
                        onDoCommand: () => {
                            openEdit();
                        }
                    }),
                    ...childLabel
                ];
            }
            return childLabel;
        }
    }
});

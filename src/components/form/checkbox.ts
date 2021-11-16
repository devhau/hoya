import { h, defineComponent, computed } from 'vue';
import { isArray, makeTextClass } from '@/utils/class.util';


export const vhCheckbox = defineComponent({
    name: 'vh-checkbox',
    props: {
        modelValue: {
            default: null,
        },
        value: {
            default: true,
        },
        falseValue: {
            default: undefined,
        },
        checked: {
            type: Boolean,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: undefined,
        },
        class: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'checkbox'
        }
    },
    data() {
        return {
            _checked: false,
            _first: true,
        }
    },
    mounted() {
        if (this.checked !== undefined)
            this._checked = this.checked === true;

    },
    methods: {
        updateStatus(flg: any) {
            if (this.disabled === true) return;
            this._checked = flg;
            let _modelValue: any = flg ? (this.value ?? true) : this.falseValue;
            if (isArray(this.modelValue)) {
                _modelValue = this.modelValue;
                if (flg) {
                    _modelValue.push(this.value);
                } else {
                    _modelValue = _modelValue.filter((item: any) => item != this.value);
                }
            }
            this.$emit('update:modelValue', _modelValue, flg);
            this.$emit('checked', flg, flg ? (this.value ?? true) : this.falseValue);
            this.$emit('update:checked', flg);
        },
    },
    watch: {
        checked: {
            handler(newValue) {
                this._checked = newValue === true;
            },
            deep: true
        }
    },
    render() {
        const { label, type, class: classProps, value, disabled } = this;

        let className = 'form-check-input';
        className = makeTextClass(className, '', classProps, '');
        if (this._first === true) {
            this._first = false;
            if (this.modelValue && isArray(this.modelValue)) {
                this._checked = (this.modelValue as any).includes(value);
            } else {
                this._checked = this.modelValue == value;
            }
        }
        const childrenInput = h(
            'input',
            {
                ...this.$attrs,
                disabled,
                value: value,
                type: type,
                checked: this._checked,
                class: className,
                onChange: (e: any) => {
                    if (e.target.checked != this._checked)
                        this.updateStatus(e.target.checked);
                },
            },
        );
        const children = computed(() => {
            if (label) {
                return [
                    childrenInput,
                    h('label', {
                        class: 'form-check-label',
                        onClick: () => {
                            this.updateStatus(!this._checked);
                        }
                    }, label)
                ]
            } else {
                return [childrenInput];
            }
        });
        // return the render function
        return h('div', {
            class: 'form-check vh-form-check',
        },
            children.value
        );
    }
});

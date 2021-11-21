import { h, defineComponent } from 'vue';
import { makeClassByName, makeValueByData } from '@/utils/class.util';

export const vhSelect = defineComponent({
    name: 'vh-select',
    props: {
        modelValue: {
            default: null,
        },
        modelItem: {
            default: null,
        },
        source: {
            type: Array,
            default: [],
        },
        class: {
            type: String,
            default: '',
        },
        fieldValue: {
            type: String,
            default: 'id',
        },
        fieldDisplay: {
            type: String,
            default: 'name',
        },
        textAll: {
            type: String,
            default: 'All'
        },
        valueAll: {
            default: null
        },
        isAll: {
            type: Boolean,
            default: false,
        }
    },
    render() {

        const { fieldValue, fieldDisplay, source, class: classProps, textAll, valueAll, isAll } = this;
        let className = 'form-select';
        className = makeClassByName(className, '', classProps, '');
        const changeValue = (e: any) => {
            this.$emit('update:modelValue', e.target.value);
            if (source) {
                this.$emit('update:modelItem', source[isAll ? (e.target.selectedIndex - 1) : (e.target.selectedIndex)]);
            }
        }
        const children = () => {
            if (this.$slots.default) {
                return [this.$slots.default];
            } else {
                return source?.map((item) => h('option', {
                    value: makeValueByData(item, fieldValue),
                    selected: makeValueByData(item, fieldValue) == this.modelValue ? true : undefined
                }, makeValueByData(item, fieldDisplay)));
            }
        };
        // return the render function
        return h('select', {
            ...this.$attrs,
            class: className,
            onChange: changeValue,
        },
            [
                isAll && h('option', { value: valueAll }, textAll),
                ...children() as any,
            ]
        );
    }
});

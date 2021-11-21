import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';
import { vhCheckbox } from './checkbox';
import { isArray, isFunction } from '@vue/shared';
const checkboxComponent: any = vhCheckbox;
export const vhGroupCheckbox = defineComponent({
    name: 'vh-group-checkbox',
    props: {
        modelValue: {
            default: null,
        },
        itemDisabled: {
            default: null
        },
        itemText: {
            default: 'text'
        },
        itemValue: {
            default: 'value'
        },
        headerText: {
            default: 'text'
        },
        headerValue: {
            default: 'sub'
        },
        class: {
            type: String,
            default: ''
        },
        showCollapse: {
            type: Boolean,
            default: true
        },
        defaultCollapse: {
            type: Boolean,
            default: false
        },
        source: {
            default: {}
        },
    },
    data() {
        return {
            _checked: false,
            collapse: {}
        }
    },
    mounted() {
    },
    methods: {
        updateValue(value: any) {
            this.$emit('update:modelValue', value);
        },
    },
    render() {
        const { class: classProps, source, modelValue, itemText, itemValue, headerText, headerValue, collapse, showCollapse, defaultCollapse, itemDisabled }: any = this;
        let className = 'vh-group-checkbox';
        className = makeClassByName(className, '', classProps, '');
        const checkValue = (val: any) => modelValue?.includes && modelValue?.includes(val);
        const checkSubValue = (sub: any) => sub && sub.filter && sub.length === sub.filter((item: any) => checkValue(item.value)).length;
        const checkItemDisabled = (val: any, item: any = undefined) => {
            if (itemDisabled == null) {
                return false;
            }
            if (isFunction(itemDisabled)) {
                return itemDisabled(val, item);
            }
            if (isArray(itemDisabled)) {
                return itemDisabled.indexOf(val) >= 0;
            }
            return itemDisabled == val;
        }
        // return the render function
        return h('div', {
            class: className,
            ...this.$attrs
        },
            source?.map && source?.map((item: any, index: any) => h('div',
                {
                    class: 'vh-group-item',
                },
                [
                    h('div',
                        {
                            class: 'vh-group-item-header',
                            onClick: (e: any) => {
                                if (e.target.className.indexOf('vh-group-item-header') >= 0 || e.target.className.indexOf('vh-form-check') >= 0) {
                                    (this.collapse as any)[index] = !(collapse[index] === undefined ? defaultCollapse : collapse[index]);
                                }
                            }
                        },
                        [
                            h(checkboxComponent, {
                                label: item[headerText],
                                checked: checkSubValue(item.sub),
                                disabled: checkItemDisabled(undefined, item) ? true : undefined,
                                onChecked: (check: any) => {
                                    if (check === true) {
                                        item[headerValue].forEach((_item: any) => {
                                            if (!checkValue(_item.value)) {
                                                modelValue.push(_item.value);
                                            }
                                        })
                                        this.updateValue(modelValue);
                                    } else {
                                        this.updateValue(modelValue.filter((vl: any) => item[headerValue]?.filter((_item: any) => _item.value === vl).length === 0));
                                    }
                                }
                            })
                            ,
                            showCollapse && h('i', {
                                class: 'bi ' + ((collapse[index] === undefined ? defaultCollapse : collapse[index]) ? 'bi-caret-left' : ' bi-caret-down'),
                                onClick: () => {
                                    (this.collapse as any)[index] = !(collapse[index] === undefined ? defaultCollapse : collapse[index]);
                                }
                            })
                        ]
                    )
                    ,
                    (!showCollapse || !(collapse[index] === undefined ? defaultCollapse : collapse[index])) && h('div',
                        {
                            class: 'vh-group-item-body'
                        },
                        item[headerValue]?.map((sub: any) =>
                            h(checkboxComponent, {
                                label: sub[itemText],
                                value: sub[itemValue],
                                checked: checkValue(sub[itemValue]),
                                disabled: checkItemDisabled(sub[itemValue]) ? true : undefined,
                                onChecked: (check: any) => {
                                    let _val = sub[itemValue];
                                    if (check === true) {
                                        modelValue.push(_val);
                                        this.updateValue(modelValue);
                                    } else {
                                        this.updateValue(modelValue.filter((vl: any) => vl != _val));
                                    }
                                }
                            })
                        )
                    )
                ]
            ))
        );
    }
});

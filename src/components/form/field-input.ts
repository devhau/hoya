import { h, resolveComponent, inject, watch, ref, defineComponent } from 'vue';
import { isFunction } from '@/utils/class.util';
import { System } from '@/constants';
export const vhFieldInput = defineComponent({
    name: 'vh-field-input',
    props: {
        modelValue: {
            default: null,
        },
        fieldType: {
            type: String,
            default: 'Text',
        }
    },
    setup(props, { emit, attrs }) {
        let global: any = inject(System.provide);
        let input = ref(global.$FieldType[props.fieldType].component);
        watch(() => props.fieldType, () => {
            input.value = global.$FieldType[props.fieldType].component;
        });
        const children = () => {
            if (isFunction(input.value)) {
                return input.value();
            }
            return h(
                resolveComponent(input.value),
                {
                    ...attrs,
                    value: props.modelValue,
                    oninput: (e: any) => {
                        emit('update:modelValue', e.target.value);
                    },
                    onchange: (e: any) => {
                        emit('update:modelValue', e.target.value);
                    },
                },
            );
        };
        // return the render function
        return children;
    }
});

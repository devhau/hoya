import { h, defineComponent, ref, onMounted } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhInput = defineComponent({
    name: 'vh-input',
    props: {
        modelValue: {
            default: null,
        },
        class: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        focusOnStart: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'].includes(val),
        },
    },
    setup(props: any, { emit, attrs }) {
        const refElInput: any = ref(null);
        const { size, class: classProps, type, focusOnStart } = props;
        let className = makeClassByName('form-control', 'form-control', size);
        className = makeClassByName(className, '', classProps, '');
        onMounted(() => {
            if (focusOnStart) {
                refElInput.value.focus();
            }
        });
        // return the render function
        return () =>
            h(
                'input',
                {
                    ...attrs,
                    value: props.modelValue,
                    type: type,
                    class: className,
                    ref: refElInput,
                    onInput: (e: any) => {
                        emit('update:modelValue', e.target.value);
                    },
                    onChange: (e: any) => {
                        emit('update:modelValue', e.target.value);
                    },
                },
            );
    }
});

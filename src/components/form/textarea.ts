import { h, computed, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhTextarea = defineComponent({
    name: 'vh-textarea',
    props: {
        modelValue: {
            default: '',
        },
        class: {
            type: String,
            default: ''
        }
    },
    setup(props, { slots, attrs, emit }) {
        const { class: classProps } = props;
        let className = 'form-control';
        className = makeClassByName(className, '', classProps, '');
        const children = computed(() => {
            if (slots.default) {
                return slots.default;
            } else {
                return props?.modelValue;
            }
        });
        // return the render function
        return () =>
            h('textarea', {
                ...attrs,
                class: className,
                onInput: (e: any) => {
                    emit('update:modelValue', e.target.value);
                },
                onChange: (e: any) => {
                    emit('update:modelValue', e.target.value);
                },
            },
                children.value
            );
    }
});

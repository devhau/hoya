import { vhLabelInput } from '@/components/form/label-input';
import { defineComponent, h } from 'vue';
import { vhDraggable } from '@/components/draggable';
import { vhKanbanItem } from './kanban-item';
const vhDraggableComponent = vhDraggable as any;
const vhKanbanItemComponent = vhKanbanItem as any;
const vhLabelInputComponent = vhLabelInput as any;
const props = {
    modelValue: {
        required: false,
        default: {}
    },
    itemKey: {
        type: [String, Function],
        required: true
    },
    clone: {
        type: Function,
        default: (original: any) => {
            return original;
        }
    },
    class: {
        type: String,
        default: ''
    },
    itemIndex: {
        type: Number,
        default: 0
    },

    move: {
        type: Function,
        default: null
    },
    forceFallback: {
        type: Boolean,
        default: true,
    },
    disabledControl: {
        type: [Array, Function],
        default: ['form-control', 'form-select', 'form-check-input', 'btn', 'draggable-disabled']
    },
};
export const vhKanbanColumn = defineComponent({
    name: 'vh-kanban-column',
    props,
    data() {
        return {
            source: {},
            sub: [],
        };
    },
    mounted() {
        this.source = this.modelValue;
    },
    watch: {
        modelValue: {
            handler(newVal: any) {
                this.source = newVal;
            },
            deep: true
        }
    },
    render() {
        let { id, name, sub }: any = this.source;
        const { content, item, footer }: any = this.$slots;
        const itemChild = (data: any) => {
            if (item) {
                return h(item, {
                    key: data.index,
                    class: 'vh-kanban-item',
                    element: data.element,
                    itemIndex: data.index,
                });
            }
            if (content) {
                return h(vhKanbanItemComponent, {
                    class: 'vh-kanban-item',
                    element: data.element,
                    itemIndex: data.index,
                }, {
                    item: () => h(content, {
                        ...data
                    })
                });
            }
            return h(vhLabelInputComponent, {
                class: 'vh-kanban-item',
                element: data.element,
                itemIndex: data.index,
            });
        }
        return h('div',
            {
                class: 'vh-kanban-column'
            },
            h('div',
                { class: 'vh-kanban-card' },
                [
                    h(vhLabelInputComponent,
                        {
                            class: 'vh-kanban-card-title',
                            classEdit: "draggable-disabled",
                            modelValue: name,
                            'onUpdate:modelValue': (e: any) => {
                                this.$emit('update:modelValue', {
                                    name: e, sub
                                });
                            }
                        }
                    ),
                    h(vhDraggableComponent,
                        {
                            modelValue: sub,
                            class: 'vh-kanban-card-body',
                            itemKey: this.itemKey,
                            forceFallback: this.forceFallback,
                            group: 'vh-kanban-item',
                            'onUpdate:modelValue': (e: any) => {
                                this.$emit('update:modelValue', {
                                    id, name, sub: e
                                });
                            }
                        },
                        {
                            item: itemChild
                        }
                    ),
                    h(footer, {
                        column: this.source,
                        index: this.itemIndex,
                        update: (data: any) => {
                            this.$emit('update:modelValue', data);
                        }
                    })
                ])
        );
    }
});
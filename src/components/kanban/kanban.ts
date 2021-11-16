import { makeTextClass } from '@/utils/class.util';
import { defineComponent, h } from 'vue';
import { vhKanbanColumn } from './kanban-column';
import { vhDraggable } from '@/components/draggable';
const vhDraggableComponent = vhDraggable as any;
const vhKanbanColumnComponent = vhKanbanColumn as any;
const props = {
    modelValue: {
        type: Array,
        required: false,
        default: null
    },
    itemKey: {
        type: [String, Function],
        required: true,
        default: 'id'
    },
    itemSubKey: {
        type: [String, Function],
        required: true,
        default: 'id'
    },
    itemTitle: {
        type: [String, Function],
        required: true,
        default: 'name'
    },
    itemSubTitle: {
        type: [String, Function],
        required: true,
        default: 'name'
    },
    class: {
        type: String,
        default: ''
    },
    forceFallback: {
        type: Boolean,
        default: true,
    },
    disabledControl: {
        type: [Array, Function],
        default: ['form-control', 'form-select', 'form-check-input', 'btn', 'draggable-disabled']
    }
};
export const vhKanban = defineComponent({
    name: 'vh-kanban',
    components: { vhKanbanColumn },
    props,
    data() {
        return {
            source: {},
        };
    },
    created() {
        this.source = this.modelValue;
    },
    mounted() {
        this.source = this.modelValue;
    },
    watch: {
        modelValue: {
            handler(newVal) {
                this.source = newVal;
            },
            deep: true
        }
    },
    render() {
        let disabledControl = this.disabledControl;
        let forceFallback = this.forceFallback;
        let classProps = this.class;
        let className = makeTextClass('vh-kanban', '', classProps, '');
        let { column, footerColumn, item, footerItem, contentItem }: any = this.$slots;
        const kanbanColumnChild = (data: any) => {
            if (column) {
                return h(column,
                    {
                        key: data.index,
                        modelValue: data.element, itemIndex: data.index, disabledControl, forceFallback, itemKey: this.itemSubKey,
                        'onUpdate:modelValue': (e: any) => {
                            (this.source as any)[data.index] = e;
                            this.$emit('update:modelValue', this.source);
                        }
                    },
                    {
                        item: item,
                        footer: footerItem,
                        content: contentItem
                    });
            }
            return h(vhKanbanColumnComponent,
                {
                    modelValue: data.element, itemIndex: data.index, disabledControl, forceFallback, itemKey: this.itemSubKey,
                    'onUpdate:modelValue': (e: any) => {
                        (this.source as any)[data.index] = e;
                        this.$emit('update:modelValue', this.source);
                    },
                },
                {
                    item: item,
                    footer: footerItem,
                    content: contentItem
                });
        }
        return h(vhDraggableComponent, {
            disabledControl, forceFallback,
            modelValue: this.source,
            itemKey: this.itemKey,
            class: className,
            handle: '.vh-kanban-card',
            group: 'vh-kanban-column',
            'onUpdate:modelValue': (e: any) => {
                this.source = e;
                this.$emit('update:modelValue', this.source);
            }
        }, {
            item: kanbanColumnChild,
            footer: () => h(footerColumn, {
                data: this.modelValue,
                update: (data: any) => {
                    this.$emit('update:modelValue', data);
                }
            })
        });
    }
});
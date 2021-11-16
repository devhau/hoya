import { defineComponent, h } from 'vue';
const props = {
    class: {
        type: String,
        default: ''
    },
    element: {
        default: {}
    },
    itemIndex: {
        default: 0,
    }
};
export const vhKanbanItem = defineComponent({
    name: 'vh-kanban-item',
    props,

    render() {
        let { name }: any = this.element;
        let { item }: any = this.$slots;
        let childEl = () => {
            if (item) {
                return [h(item, {
                    element: this.element,
                    index: this.itemIndex
                })];
            }
            return name;
        }
        return h('div', {
            class: this.class
        }, childEl());
    }
});
import { h, defineComponent, nextTick } from 'vue';
import { isFunction, } from '@/utils/class.util';
import { events } from "./core/sortableEvents";
import { computeComponentStructure } from './core/renderHelper';
import { createSortableOption, getComponentAttributes, getValidSortableEntries } from './core/componentBuilderHelper';
import Sortable from 'sortablejs';
import { insertNodeAt, removeNode } from '@/utils/tags.util';


let draggingElement: any = null;
const props = {
  list: {
    type: Array,
    required: false,
    default: null
  },
  modelValue: {
    type: Array,
    required: false,
    default: null
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
  tag: {
    type: String,
    default: "div"
  },
  move: {
    type: Function,
    default: null
  },
  forceFallback: {
    type: Boolean,
    default: false,
  },
  disabledControl: {
    type: [Array, Function],
    default: ['form-control', 'form-select', 'form-check-input', 'btn', 'draggable-disabled']
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
const emits = [
  "update:modelValue",
  "change",
  ...[...events.manageAndEmit, ...events.emit].map(evt => evt.toLowerCase())
];
export const vhDraggable = defineComponent({
  name: 'vh-draggable',
  inheritAttrs: false,

  props,

  emits,

  data() {
    return {
      context: {},
      _sortable: {},
      componentStructure: {},
      targetDomElement: {},
      error: false
    };
  },

  render() {
    try {
      this.error = false;
      const { $slots, tag, componentData, realList, getKey, $attrs, forceFallback, disabledControl }: any = this;
      let classPros = this.class;
      const componentStructure = computeComponentStructure({
        $slots,
        tag: tag,
        realList,
        getKey
      });
      if (classPros === undefined || classPros === '' || classPros.split(' ').indexOf('vh-draggable') < 0) {
        classPros = `${classPros} vh-draggable`.trim();
      }
      if (forceFallback) {
        classPros = `${classPros} vh-draggable-fallback`.trim();
      }
      const classDisableControl = isFunction(disabledControl) ? disabledControl() : disabledControl;
      let disabled = false;
      const CheckDisableControl = (e: any) => {
        if (this._sortable != null) {
          if (e.target.className.split(' ').filter((item: any) =>
            [...classDisableControl].includes(item.trim())
          ).length == 0) {
            if (disabled != false) {
              disabled = false;
              // @ts-ignore
              this._sortable.option("disabled", disabled);
            }
          } else {
            if (disabled != true) {
              disabled = true;
              // @ts-ignore
              this._sortable.option("disabled", disabled);
            }
          }
        }
      };
      this.componentStructure = componentStructure;
      const attributes = getComponentAttributes({ $attrs, componentData });
      return componentStructure.render(h, { ...attributes, class: classPros, onmousemove: CheckDisableControl });
    } catch (err: any) {
      this.error = true;
      return h("pre", { style: { color: "red" } }, err.stack);
    }
  },

  created() {
    if (this.list !== null && this.modelValue !== null) {
      console.error(
        "modelValue and list props are mutually exclusive! Please set one or another."
      );
    }
  },

  mounted() {
    if (this.error) {
      return;
    }

    const { $attrs, $el, componentStructure, forceFallback }: any = this;
    componentStructure.updated();
    const sortableOptions = createSortableOption({
      $attrs: { ...$attrs, forceFallback, dragoverBubble: forceFallback },
      callBackBuilder: {
        manageAndEmit: (event: any) => this.manageAndEmit(event),
        emit: (event: any) => this.emit(event, this),
        manage: (event: any) => this.manage(event)
      },
    });
    const targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
    this._sortable = new Sortable(targetDomElement, sortableOptions);
    this.targetDomElement = targetDomElement;
    targetDomElement.__draggable_component__ = this;
  },

  updated() {
    // @ts-ignore
    this.componentStructure.updated();
  },

  beforeUnmount() {
    // @ts-ignore
    if (this._sortable !== undefined) this._sortable.destroy();
  },

  computed: {
    realList() {
      const { list } = this;
      return list ? list : this.modelValue;
    },

    getKey() {
      const { itemKey }: any = this;
      if (typeof itemKey === "function") {
        return itemKey;
      }
      return (element: any) => element[itemKey];
    }
  },

  watch: {
    $attrs: {
      handler(newOptionValue) {
        const { _sortable }: any = this;
        if (!_sortable) return;
        getValidSortableEntries(newOptionValue).forEach(([key, value]) => {
          _sortable.option(key, value);
        });
      },
      deep: true
    }
  },

  methods: {

    emit(evtName: any, evtData: any) {
      nextTick(() => this.$emit(evtName.toLowerCase(), evtData));
    },

    manage(evtName: any) {
      return (evtData: any, originalElement: any) => {
        if (this.realList !== null) {
          // @ts-ignore
          return this[`onDrag${evtName}`](evtData, originalElement);
        }
      };
    },

    manageAndEmit(evtName: any) {
      const delegateCallBack = this.manage(evtName);
      return (evtData: any, originalElement: any) => {
        delegateCallBack(evtData, originalElement);
        this.emit(evtName, evtData);
      };
    },
    getUnderlyingVm(domElement: any) {
      // @ts-ignore
      return this.componentStructure.getUnderlyingVm(domElement) || null;
    },

    getUnderlyingPotencialDraggableComponent(htmElement: any) {
      //TODO check case where you need to see component children
      return htmElement.__draggable_component__;
    },

    emitChanges(evt: any) {
      nextTick(() => this.$emit("change", evt));
    },

    alterList(onList: any) {
      if (this.list) {
        onList(this.list);
        return;
      }
      const newList = [...this.modelValue];
      onList(newList);
      this.$emit("update:modelValue", newList);
    },

    spliceList() {
      // @ts-ignore
      const spliceList = list => list.splice(...arguments);
      this.alterList(spliceList);
    },

    updatePosition(oldIndex: any, newIndex: any) {
      const updatePosition = (list: any) =>
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      this.alterList(updatePosition);
    },

    getRelatedContextFromMoveEvent({ to, related }: any) {
      const component = this.getUnderlyingPotencialDraggableComponent(to);
      if (!component) {
        return { component };
      }
      const list = component.realList;
      const context = { list, component };
      if (to !== related && list) {
        const destination = component.getUnderlyingVm(related) || {};
        return { ...destination, ...context };
      }
      return context;
    },

    getVmIndexFromDomIndex(domIndex: any) {
      // @ts-ignore
      return this.componentStructure.getVmIndexFromDomIndex(
        domIndex,
        this.targetDomElement
      );
    },

    onDragStart(evt: any) {
      this.context = this.getUnderlyingVm(evt.item);
      // @ts-ignore
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },

    onDragAdd(evt: any) {
      const element = evt.item._underlying_vm_;
      if (element === undefined) {
        return;
      }
      removeNode(evt.item);
      const newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
      // @ts-ignore
      this.spliceList(newIndex, 0, element);
      const added = { element, newIndex };
      this.emitChanges({ added });
    },

    onDragRemove(evt: any) {
      insertNodeAt(this.$el, evt.item, evt.oldIndex);
      if (evt.pullMode === "clone") {
        removeNode(evt.clone);
        return;
      }
      const { index: oldIndex, element }: any = this.context;
      // @ts-ignore
      this.spliceList(oldIndex, 1);
      const removed = { element, oldIndex };
      this.emitChanges({ removed });
    },

    onDragUpdate(evt: any) {
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      // @ts-ignore
      const oldIndex = this.context.index;
      const newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      // @ts-ignore
      const moved = { element: this.context.element, oldIndex, newIndex };
      this.emitChanges({ moved });
    },

    computeFutureIndex(relatedContext: any, evt: any) {
      if (!relatedContext.element) {
        return 0;
      }
      const domChildren = [...evt.to.children].filter(
        el => el.style["display"] !== "none"
      );
      const currentDomIndex = domChildren.indexOf(evt.related);
      const currentIndex = relatedContext.component.getVmIndexFromDomIndex(
        currentDomIndex
      );
      const draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return (draggedInList || !evt.willInsertAfter)
        ? currentIndex
        : currentIndex + 1;
    },
    onDragMove(evt: any, originalEvent: any | undefined = undefined) {
      const { move, realList } = this;
      if (!move || !realList) {
        return true;
      }
      const relatedContext = this.getRelatedContextFromMoveEvent(evt);
      const futureIndex = this.computeFutureIndex(relatedContext, evt);
      const draggedContext = {
        ...this.context,
        futureIndex
      };
      const sendEvent = {
        ...evt,
        relatedContext,
        draggedContext
      };
      return move(sendEvent, originalEvent);
    },
    onDragEnd() {
      draggingElement = null;
    }
  }
});


import { ComponentStructure } from "./componentStructure";
import { isHtmlTag, isTransition } from "@/utils";

function getSlot(slots: any, key: string) {
    const slotValue = slots[key];
    return slotValue ? slotValue() : [];
}

function computeNodes({ $slots, realList, getKey }: any) {
    const normalizedList = realList || [];
    const [header, footer] = ["header", "footer"].map(name =>
        getSlot($slots, name)
    );
    const { item } = $slots;
    if (!item) {
        throw new Error("draggable element must have an item slot");
    }
    const defaultNodes = normalizedList.flatMap((element: any, index: number) =>
        item({ element, index }).map((node: any) => {
            node.key = getKey(element);
            node.props = { ...(node.props || {}), "data-draggable": true };
            return node;
        })
    );
    if (defaultNodes.length !== normalizedList.length) {
        throw new Error("Item slot must have only one child");
    }
    return {
        header,
        footer,
        default: defaultNodes
    };
}

function getRootInformation(tag: any) {
    const transition = isTransition(tag);
    const externalComponent = !isHtmlTag(tag) && !transition;
    return {
        transition,
        externalComponent,
        tag: externalComponent
            ? tag
            : transition
                ? 'transition-group'
                : tag
    };
}

function computeComponentStructure({ $slots, tag, realList, getKey }: any) {
    const nodes = computeNodes({ $slots, realList, getKey });
    const root = getRootInformation(tag);
    return new ComponentStructure({ nodes, root, realList });
}

export { computeComponentStructure };
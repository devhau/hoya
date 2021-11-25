import { camelize,isHtmlAttribute } from "@/utils";
import { events, isReadOnly } from "./sortableEvents";


function project(entries: any) {
    return entries.reduce((res: any, [key, value]: any) => {
        res[key] = value;
        return res;
    }, {});
}

function getComponentAttributes({ $attrs, componentData = {} }: any) {
    const attributes = project(
        Object.entries($attrs).filter(([key]) => isHtmlAttribute(key))
    );
    return {
        ...attributes,
        ...componentData
    };
}

function createSortableOption({ $attrs, callBackBuilder }: any) {
    const options = project(getValidSortableEntries($attrs));
    Object.entries(callBackBuilder).forEach(([eventType, eventBuilder]: any) => {
        events[eventType].forEach((event: any) => {
            options[`on${event}`] = eventBuilder(event);
        });
    });
    const draggable = `[data-draggable]${options.draggable || ""}`;
    return {
        ...options,
        draggable
    };
}

function getValidSortableEntries(value: any) {
    return Object.entries(value)
        .filter(([key]) => !isHtmlAttribute(key))
        .map(([key, value]) => [camelize(key), value])
        .filter(([key]) => !isReadOnly(key));
}

export {
    getComponentAttributes,
    createSortableOption,
    getValidSortableEntries
};
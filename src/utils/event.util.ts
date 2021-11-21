import { onBeforeMount, onUnmounted } from "vue";

export const convertKeyToArr = (key: string) => {
    return key.split('+').map((item: any) => item?.trim()?.toLowerCase()).filter((item: any) => item !== null && item !== '');
}
export const checkEvent = (event: any, el: any) => {
    const path = event.path || (event.composedPath && event.composedPath());
    return path ? path.indexOf(el) < 0 : !(el === event.target || el.contains(event.target));
};
export const checkEvents = (e: any, arKeys: any) => {
    let event = window.event ? window.event : e;
    const isShift = arKeys.indexOf('shift') >= 0;
    const isAlt = arKeys.indexOf('alt') >= 0;
    const isCtrl = arKeys.indexOf('ctrl') >= 0;
    if (!event) return false;
    let flg = true;
    if (isShift && !event.shiftKey) {
        flg = false;
    }
    if (isAlt && !event.altKey) {
        flg = false;
    }
    if (isCtrl && !event.ctrlKey) {
        flg = false;
    }
    let key = event.key.trim().toLowerCase();
    if (key == "") {
        key = event.code.trim().toLowerCase();
    }
    if (['shift', 'control', 'alt', 'command'].includes(key) || arKeys.indexOf(key) < 0) {
        flg = false;
    }
    if (flg) {
        event.preventDefault();
        event.stopPropagation();
    }
    return flg;
}
export const hotKey = (keyCommand: string, doCommand: any) => {
    const arKeys = convertKeyToArr(keyCommand);
    const commandEvent = (event: any) => {
        if (checkEvents(event, arKeys)) {
            doCommand && doCommand();
        }
    };
    onBeforeMount(() => {
        if (document && document.body) {
            document.addEventListener('keydown', commandEvent);
        }
    });
    onUnmounted(() => {
        if (document && document.body) {
            document.removeEventListener('keydown', commandEvent);
        }
    });
}
export const hotKeyNone = (keyCommand: string, doCommand: any) => {
    const arKeys = convertKeyToArr(keyCommand);
    const commandEvent = (event: any) => {
        if (checkEvents(event, arKeys)) {
            doCommand && doCommand();
        }
    };
    if (document && document.body) {
        document.addEventListener('keydown', commandEvent);
    }
    return commandEvent;
}
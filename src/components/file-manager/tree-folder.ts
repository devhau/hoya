import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils';

export const vhTreeItem = defineComponent({
    name: 'vh-tree-item',
    props: {
        class: {
            type: String,
            default: '',
        },
        item: {},
        awayOpen: {
            type: Boolean,
            default: false,
        },
        parent: {}
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-tree-folder';
        className = makeClassByName(className, '', classProps, '');

        let item: any = this.item;
        let folders: any = this.folders;
        let openFolder: boolean = this.openFolder;
        if (this.folderCurrent && item.path == this.folderCurrent.path) {
            className = makeClassByName(className, '', 'active', '');
        }
        if (this.awayOpen) {
            openFolder = true;
            if (!!this.folderCurrent || item.path != this.folderCurrent.path) {
                className = makeClassByName(className, '', 'active', '');
            }
        }
        let iconItem = "bi bi-folder";
        if (item.icon) {
            iconItem = item.icon;
        } else {
            if (openFolder) {
                iconItem = "bi bi-folder2-open";
            }
        }
        // return the render function
        return h('li', {
            class: className,
            oncontextmenu: (e: any) => {
                e.preventDefault();
            },
        }, [
            item && h('span',
                {
                    class: '',
                    onClick: (e: any) => {
                        if (e.target.className.indexOf('bi bi-caret-') > -1) {
                            e.preventDefault();
                            return;
                        }
                        this.refresh(true, true);
                    },
                    onDblclick: () => {
                        this.folderUpdate(item, () => {
                            this.openFolder = false;
                            this.parent && (this.parent as any).refresh(true, true, () => {
                                this.$nextTick(() => this.refresh(true, true));
                            });

                        });
                    }
                },
                [
                    !openFolder && h('i', {
                        class: 'bi bi-caret-right', onClick: (e: any) => {
                            e.preventDefault()
                            this.refresh();
                            this.openFolder = !this.openFolder;
                        }
                    }),
                    openFolder && h('i', {
                        class: 'bi bi-caret-down', onClick: (e: any) => {
                            e.preventDefault()
                            this.openFolder = !this.openFolder;
                        }
                    }),
                    h('i', { class: iconItem }),
                    item.name
                ]
            ),
            openFolder && folders && h(vhTreeFolder, { class: '', folders, parent: this }),
        ]);
    },
    methods: {
        refresh(open = false, selectFile = false, callback: any = null) {
            this.folderChoose(this, this.item, (directories: any) => {
                this.folders = directories;
                if (open)
                    this.openFolder = true;
                callback && callback();
            }, selectFile);
        }
    },
    mounted() {
        let item: any = this.item;
        if (item && item.folders) {
            this.folders = item.folders;
        } else {
            if (this.awayOpen) {
                this.folderChoose(this, item, (directories: any) => {
                    this.folders = directories;
                });
            }

        }
    },
    data() {
        return {
            folders: null,
            openFolder: false,
        };
    },
    setup() {

        const folderCurrent: any = inject('folderCurrent')
        const folderChoose: any = inject('folderChoose');
        const folderUpdate: any = inject('folderUpdate');

        return {
            folderCurrent,
            folderChoose,
            folderUpdate
        }
    }
});
export const vhTreeFolder = defineComponent({
    name: 'vh-tree-folder',
    props: {
        class: {
            type: String,
            default: '',
        },
        folders: {
            type: Array
        },
        parent: {}
    },
    render() {
        const { class: classProps, parent } = this;
        let className = 'vh-tree-folder';
        let folders: any = this.folders;
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('ul', {
            ...this.$attrs,
            class: className
        }, folders && folders.map((item: any) => h(vhTreeItem, { item, parent })));
    },
    methods: {
    },
    mounted() {
    }
});

export const vhTreeRoot = defineComponent({
    name: 'vh-tree-root',
    props: {
        class: {
            type: String,
            default: '',
        },
        root: {
            type: String,
            default: '/'
        },
        folders: {
            type: Array
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-tree-root';
        className = makeClassByName(className, '', classProps, '');
        let item: any = {
            path: '/',
            name: 'Root',
            icon: 'bi bi-cloud'
        }
        // return the render function
        return h('div', {},
            [
                h('ul', {
                    ...this.$attrs,
                    class: className
                }, [
                    h(vhTreeItem, { item, awayOpen: true, })
                ])
            ]);
    },
});

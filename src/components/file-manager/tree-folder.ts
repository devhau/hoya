import { h, defineComponent, inject } from 'vue';
import { makeClassByName } from '@/utils/class.util';

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
        }
    },
    inject: ['folderCurrent'],
    render() {
        const { class: classProps } = this;
        let className = 'vh-tree-folder';
        className = makeClassByName(className, '', classProps, '');

        let item: any = this.item;
        let folders: any = this.folders;
        let openFolder: boolean = this.openFolder;
        if (item.path == this.folderCurrent) {
            className = makeClassByName(className, '', 'active', '');
        }
        if (this.awayOpen) {
            openFolder = true;
            if (item.path != this.folderCurrent) {
                className = makeClassByName(className, '', 'active', '');
            }
        }
        // return the render function
        return h('li', {
            class: className
        }, [
            item && h('span',
                {
                    class: '',
                    onClick: (e: any) => {
                        if (e.target.className.indexOf('bi bi-caret-') > -1) {
                            e.preventDefault();
                            return;
                        }
                        this.folderChoose(item.path);
                    }
                },
                [
                    !openFolder && h('i', {
                        class: 'bi bi-caret-right', onClick: (e: any) => {
                            e.preventDefault()
                            this.openFolder = !this.openFolder;
                        }
                    }),
                    openFolder && h('i', {
                        class: 'bi bi-caret-down', onClick: (e: any) => {
                            e.preventDefault()
                            this.openFolder = !this.openFolder;
                        }
                    }),
                    h('i', { class: item.icon }),
                    item.name
                ]
            ),
            openFolder && folders && h(vhTreeFolder, { class: '', folders }),
        ]);
    },
    mounted() {
        let item: any = this.item;
        if (item && item.folders) {
            this.folders = item.folders;
        }
    },
    data() {
        return {
            folders: null,
            openFolder: false,
        };
    },
    methods: {
    },
    setup() {
        const folderCurrent: any = inject('folderCurrent')
        const folderChoose: any = inject('folderChoose');
        return {
            folderCurrent,
            folderChoose
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
        }
    },
    render() {
        const { class: classProps } = this;
        let className = 'vh-tree-folder';
        let folders: any = this.folders;
        className = makeClassByName(className, '', classProps, '');
        // return the render function
        return h('ul', {
            ...this.$attrs,
            class: className
        }, folders && folders.map((item: any) => h(vhTreeItem, { item })));
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
            icon: 'bi bi-cloud',
            folders: [
                {
                    path: '/a1',
                    name: 'test',
                    icon: 'bi bi-folder'
                },
                {
                    path: '/a2',
                    name: 'test2',
                    icon: 'bi bi-folder',
                    folders: [
                        {
                            path: '/a2/b1',
                            name: 'test',
                            icon: 'bi bi-folder'
                        },
                        {
                            path: '/a2/b2',
                            name: 'test2',
                            icon: 'bi bi-folder',
                            folders: [
                                {
                                    path: '/a2/b2/c1',
                                    name: 'test',
                                    icon: 'bi bi-folder'
                                },
                                {
                                    path: '/a2/b2/c2',
                                    name: 'test2',
                                    icon: 'bi bi-folder'
                                },
                                {
                                    path: '/a2/b2/c3',
                                    name: 'test2',
                                    icon: 'bi bi-folder'
                                }]
                        }]
                },
                {
                    path: '/a3',
                    name: 'test2',
                    icon: 'bi bi-folder'
                },
                {
                    path: '/a4',
                    name: 'test2',
                    icon: 'bi bi-folder'
                }
            ],
        }
        // return the render function
        return h('ul', {
            ...this.$attrs,
            class: className
        }, [
            h(vhTreeItem, { item, awayOpen: true, })
        ]);
    },
    methods: {
    },
    mounted() {
    }
});

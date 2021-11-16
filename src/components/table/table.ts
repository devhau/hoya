import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';
import { vhColumnHeader } from './header';
export const vhTable = defineComponent({
    name: 'vh-table',
    props: {
        class: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'primary'
        },
        option: {},
        source: {
            default: []
        },
        isSort: {
            default: true,
        },
        isFilter: {
            default: true,
        },
        sort: {
            default: undefined
        },
        filter: {
            default: undefined
        },
        start: {
            type: Number,
            default: 1
        },
        dataEmpty: {
            default: 'No data available in table'
        }
    },
    render() {
        const { class: classProps, type, option, source, sort, filter, isFilter, isSort, start, dataEmpty }: any = this;
        let className = 'vh-table';
        className = makeTextClass(className, 'table', type);
        className = makeTextClass(className, '', classProps, '');
        let dataHeader = (column: any) => {
            if (this.$slots[`header_${column.field}`]) {
                let field: any = this.$slots[`header_${column.field}`];
                return h(field, {
                    column
                })
            }
            return h(vhColumnHeader, {
                option: column,
                sort: sort && sort[column.field] === true ? true : false,
                isSort: sort && isSort,
                filter: filter ? filter[column.field] : null,
                isFilter: filter && isFilter,
                onSort: (sortAsc: any) => {
                    this.$emit('sort', column, sortAsc);
                },
                onShowFilter: (isShow: any) => {
                    this.$emit('showFilter', column, isShow);
                },
                onFilter: (dataFilter: any) => {
                    this.$emit('filter', column, dataFilter);
                }
            }, {
                bodyFilter: this.$slots[`filter_${column.field}`] ?? column.bodyFilter
            });
        }
        let header = h('thead',
            {
            },
            h('tr', {

            },
                option?.columns?.map((item: any) => h('td', {}, dataHeader(item)))
            )
        )
        let dataCell = (column: any, row: any, index: any) => {
            if (column.dataCell) {
                return column.dataCell(row, index, start);
            }
            if (this.$slots[`field_${column.field}`]) {
                let field: any = this.$slots[`field_${column.field}`];
                return h(field, {
                    column,
                    row,
                    index,
                    start
                })
            }

            return row[column.field]
        }
        let body = h('tbody', {},
            source?.map((row: any, index: any) =>
                h('tr', {
                    style: option?.styleRow && option?.styleRow(row, index, start),
                    class: option?.classRow && option?.classRow(row, index, start)
                },
                    option?.columns?.map((item: any) =>
                        h('td', {
                            style: item.styleCell && item.styleCell(row, index, start),
                            class: item.classCell && item.classCell(row, index, start)
                        }, [dataCell(item, row, index)])
                    )
                )
            )
        )
        if (!source || source.length == 0) {
            body = h('tbody', {}, h('tr', {}, h('td', { class: 'vh-data-emtpy', colspan: option?.columns?.length }, dataEmpty))
            );
        }
        let table = h('table', {
            class: 'table'
        }, [
            header,
            body
        ]);
        // // return the render function
        return h('div',
            {
                class: className,
            },
            table
        );
    }
});
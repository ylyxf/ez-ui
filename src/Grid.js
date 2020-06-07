ezui.grid = {
    removeConfirm: function (callback) {
        window.top.$.messager.confirm({
            title: '确定提示',
            msg: '确定要删除您选中的记录吗？',
            fn: callback
        });
    },
    getSelectedRowId: function (dataGridId, single, idProperty) {
        idProperty = idProperty ? idProperty : 'id';
        var result = null;

        if (single) {
            var row = dataGridId.datagrid('getSelected');
            if (row) {
                result = row[idProperty];
            }
        } else {
            var rows = dataGridId.datagrid('getSelections');
            if (rows.length == 0) {
                result = ezui.uitls.propertyArray(rows, idProperty);
            }
        }

        if (!result) {
            window.top.$.messager.alert('提示', '请先选中要操作的记录');
            return false;
        }
        return result;
    },

    getSelectedRow: function (dataGridId, single) {
        var result = null;

        if (single) {
            var row = dataGridId.datagrid('getSelected');
            if (row) {
                result = row;
            }
        } else {
            var rows = dataGridId.datagrid('getSelections');
            if (rows.length == 0) {
                result = rows;
            }
        }

        if (!result) {
            window.top.$.messager.alert('提示', '请先选中要操作的记录');
            return false;
        }
        return result;
    },

    dictFormatter: function (dictCode) {
        return function (value, rowData, rowIndex) {
            return ezui.dict.getDictValue(dictCode, value);
        }
    },
}
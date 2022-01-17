import React, { Component, useState } from 'react'
import { Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        name: "Edward King" + { i },
        age: 32,
        address: "London, Park Lane no." + { i },
    });
}

export default function Clinic() {

    const [count, setCount] = useState(0)
    const onChange = () => {
        setCount(count + 1)
    }

    const [selectedRowKeys, setSelectRow] = useState([])
    const [loading, setLoading] = useState(false)

    const start = () => {
        setLoading(true)
        // ajax request after empty completing
        setTimeout(() => {
            setSelectRow([])
        }, 1000);
    }

    const onSelectChange = selectedRowKeys => {
        setSelectRow(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? "Selected" + selectedRowKeys.length + "items" : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    )
}

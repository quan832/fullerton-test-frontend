import React from 'react';
import { Table, Tag, Space, PageHeader } from 'antd';
import Header from 'modules/dashboard/components/Header/Header';
import { PageHeader1 } from './usertable.style.js';
import {
    DashboardContainerStyled
} from 'modules/dashboard/container/DashboardContainer.styled';
const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function Clinic() {
    return (
        <DashboardContainerStyled>
            <PageHeader1>
                <Header title="Clinic" />
            </PageHeader1>
            <div>
                < Table dataSource={data} >
                    <Column title="Name" dataIndex="lastName" key="lastName" />
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                                {tags.map(tag => (
                                    <Tag color="green" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )} />
                        <Column
                        title="Action"
                        key="action"
                        render={(_text, record) => (
                            <Space size="middle">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )} />
                </Table >
            </div>
        </DashboardContainerStyled>
    );
}
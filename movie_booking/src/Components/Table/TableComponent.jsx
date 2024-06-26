import React, { useState } from "react";
import { Button, Table, Modal } from "antd";

export const TableComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { columns = [], data: dataSource = [] } = props;
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
      <div
        style={{
          marginTop: "10px",
          border: "1px solid #c0c0c0",
          width: "150vh",
        }}
      >
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
          {...props}
        />
      </div>
  );
};

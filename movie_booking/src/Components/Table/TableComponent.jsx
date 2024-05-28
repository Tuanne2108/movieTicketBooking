import React, { useState } from "react";
import { Button, Table, Modal } from "antd";

export const TableComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { columns = [], data: dataSource = [], handleDeleteMany } = props;
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleteAll = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = () => {
    handleDeleteMany(selectedRowKeys);
    setShowDeleteConfirmation(false);
    setSelectedRowKeys([]);
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      {hasSelected && (
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            danger
            type="primary"
            onClick={handleDeleteAll}
            disabled={!hasSelected}
          >
            Delete
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
      )}
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

      {/* Delete confirmation modal */}
      <Modal
        title="Confirm Delete"
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete these items?</p>
      </Modal>
    </div>
  );
};

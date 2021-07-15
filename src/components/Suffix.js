import {HeartOutlined} from "@ant-design/icons";
import React, {useState} from "react";

export const Suffix = (isModalVisible) => {
    return (
        <HeartOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
            onClick={() => {
                isModalVisible.setIsModalVisible(true)}}
        />
    )
}

import React, {useState} from 'react';
import  {Col, Row, Modal, Button, Input, Select, Slider, InputNumber} from 'antd';
import './../style/ModalWindow.css'
import {useDispatch} from "react-redux";
import {fetchQueries} from "../store-redux/favorite-queries/api";

const {Option} = Select

export const ModalWindow = (props) => {
    const {title, maskStyle, isModalVisible, handleOkButton, handleCancelButton, queryString, isQueryChange} = props
    const [queryResultCount, setQueryResultCount] = useState(12)
    const [queryName, setQueryName] = useState('')
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(fetchQueries(queryString, queryName, queryResultCount))
        setQueryName('')
        setQueryResultCount(12)
        handleOkButton()
    }
    return (
        <Modal title={title}
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancelButton}
               maskStyle={maskStyle}
               closable={null}
               okText='Сохранить'
               okButtonProps={{size: "large", block: "true"}}
               cancelText='Не сохранять'
               cancelButtonProps={{size: "large", block: "true"}}
        >
            <div>
                <h1>Запрос</h1>
                <Input value={queryString}
                       disabled={isQueryChange === 'false' ? 'false' : 'true'}
                       size="large"
                />
            </div>
            <div>
                <h1>*Название</h1>
                <Input placeholder='Укажите название'
                       value={queryName}
                       onChange={(e) => setQueryName(e.target.value)}
                       size="large"
                />
            </div>
            <div>
                <h1>Сортировать по</h1>
                <Select defaultValue='Без сортировки' size="large" style={{width: "100%"}} >
                    <Option>как-то там</Option>
                </Select>
            </div>
            <div>
                <h1>Количество запросов</h1>
                <Row>
                    <Col span={18}>
                        <Slider defaultValue={queryResultCount}
                                value={queryResultCount}
                                max='50'
                                onChange={(value) => setQueryResultCount(value)}
                        />
                    </Col>
                    <Col span={6}>
                        <InputNumber
                            min={0}
                            max={50}
                            style={{margin: '0 16px'}}
                            value={queryResultCount}
                            onChange={(value) => setQueryResultCount(value)}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}
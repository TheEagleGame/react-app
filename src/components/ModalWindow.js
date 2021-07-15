import React, {useState} from 'react';
import  {Col, Row, Modal, Button, Input, Select, Slider, InputNumber} from 'antd';
import './../style/ModalWindow.css'

const {Option} = Select

export const ModalWindow = (props) => {
    const {title, maskStyle, isModalVisible, handleOk, handleCancel, queryString} = props
    const [queryCount, setInputQuery] = useState('12')
    const [queryName, setQueryName] = useState('')
    return (
        <Modal title={title}
               visible={isModalVisible}
               onOk={handleOk}
               onCancel={handleCancel}
               maskStyle={maskStyle}
               closable={null}
               okText='Сохранить'
               cancelText='Не сохранять'
        >
            <div>
                <h1>Запрос</h1>
                <Input value={queryString}/>
            </div>
            <div>
                <h1>*Название</h1>
                <Input placeholder='Введите название'
                       value={queryName}
                       onChange={(e) => setQueryName(e.target.value)}/>
            </div>
            <div>
                <h1>Сортировать по</h1>
                <Select defaultValue='Сортировать по'>
                    <Option>как-то там</Option>
                </Select>
            </div>
            <div>
                <h1>Количество запросов</h1>
                <Row>
                    <Col span={12}>
                        <Slider defaultValue={queryCount}
                                max='50'/>
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={0}
                            max={50}
                            style={{margin: '0 16px'}}
                            value={queryCount}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}
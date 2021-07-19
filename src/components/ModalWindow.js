import React from 'react';
import {Col, Row, Modal, Input, Select, Slider, InputNumber} from 'antd';
import './../style/ModalWindow.css'
import {Formik} from "formik";

const {Option} = Select

export const ModalWindow = (props) => {
    const {
        title,
        maskStyle,
        isModalVisible,
        okText,
        cancelText,
        handleOkButton,
        handleCancelButton,
        queryString,
        isQueryChange,
        currentValue
    } = props

    const initialValue = {
        name: '',
        count: '12',
        query: queryString,
        id: ''
    }
    return (
        <Formik initialValues={currentValue || initialValue }>
            { ({values, handleChange, setFieldValue}) => (
                <Modal title={title}
                       visible={isModalVisible}
                       onOk={ () => {
                           handleOkButton(values)
                       }}
                       onCancel={handleCancelButton}
                       maskStyle={maskStyle}
                       closable={null}
                       okText={okText}
                       okButtonProps={{size: "large", block: "true"}}
                       cancelText={cancelText}
                       cancelButtonProps={{size: "large", block: "true"}}
                >
                    <div>
                        <h1>Запрос</h1>
                        <Input value={values.query}
                               onChange={handleChange}
                               disabled={isQueryChange === false ? true : false}
                               size="large"
                               name="query"
                        />
                    </div>
                    <div>
                        <h1>*Название</h1>
                        <Input placeholder='Укажите название'
                               onChange={handleChange}
                               value={values.name}
                               size="large"
                               name="name"
                        />
                    </div>
                    <div>
                        <h1>Сортировать по</h1>
                        <Select defaultValue='Без сортировки' size="large" style={{width: "100%"}}>
                            <Option >разные сортировки</Option>
                        </Select>
                    </div>
                    <div>
                        <h1>Количество запросов</h1>
                        <Row>
                            <Col span={18}>
                                <Slider
                                    value={values.count}
                                    onChange={(count) => setFieldValue("count", count)}
                                    max='50'
                                    name="count"
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    min={0}
                                    max={50}
                                    style={{margin: '0 16px'}}
                                    value={values.count}
                                    onChange={(count) => setFieldValue("count", count)}
                                   name="count"
                                />
                            </Col>
                        </Row>
                    </div>
                </Modal>
                )
            }
        </Formik>
    )
}
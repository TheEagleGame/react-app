import {Header} from "./Header";
import React, {useEffect, useState} from "react";
import "../style/SearchPage.css";
import {search} from "../store-redux/search/actions";
import {Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loadVideo} from "../store-redux/search/api";
import Grid from "./../assets/grid.svg"
import List from "./../assets/list.svg"
import {Suffix} from "./Suffix";
import {ModalWindow} from "./ModalWindow";

const {Search} = Input



export const SearchPage = () => {
    /*useEffect(() => {
        dispatch(loadVideo())
    }, [])*/
    const dispatch = useDispatch()
    const queryString = useSelector(state => state.search.queryString)
    const video = useSelector(state => state.search.video)
    const [value, setValue] = useState(queryString)
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (<>
            <Header/>
            <div className="search-wrapper">
                <div className='search-line'>
                    <h1 className='search-line__title'>Поиск видео</h1>
                    <div className='search'>
                        <Search
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className='search__input'
                            placeholder="Что хотите посмотреть?"
                            enterButton="Найти"
                            size="large"
                            suffix={<Suffix isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />}
                            onSearch={() => {
                                dispatch(search(value))
                                dispatch(loadVideo())
                            }}
                        />
                    </div>
                </div>

                <div className="search-query">
                    <div>
                        Видео по запросу <span className="search-query__text">"{queryString}"</span>
                    </div>
                    <div className="search-icon">
                        <img src={List} alt="" width='24px' height='24px' className='search-icon__item'/>
                        <img src={Grid} alt="" width='24px' height='24px' className='search-icon__item'/>
                    </div>
                </div>

                <div className="search-result">
                    {video.map((item) =>
                        <div className='search-result__item'>
                            <img className='search-result__img' src={item.url}/>
                            <h1 className='search-result__title'>{item.title}</h1>
                            <h2 className='search-result__description'>{item.channelTitle}</h2>
                            <div>{item.viewCount}</div>
                        </div>
                    )}
                </div>
            </div>
            <ModalWindow
                title='Сохранить запрос'
                isModalVisible={isModalVisible}
                handleOk={() => setIsModalVisible(false)}
                handleCancel={() => setIsModalVisible(false)}
                maskStyle={{backgroundColor: 'rgba(117, 199, 255, 0.8'}}
                queryString={queryString}
            />
        </>
    )
}
import {Header} from "./Header";
import React, {useEffect, useState} from "react";
import "../style/SearchPage.css";
import {search} from "../store-redux/search/actions";
import {Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loadVideo} from "../store-redux/search/api";
import {ReactComponent as Grid} from "./../assets/grid.svg"
import {ReactComponent as List} from "./../assets/list.svg"
import {Suffix} from "./Suffix";
import {ModalWindow} from "./ModalWindow";

const {Search} = Input


export const SearchPage = () => {
    useEffect(() => {
        dispatch(loadVideo())
    }, [])
    const dispatch = useDispatch()
    const queryString = useSelector(state => state.search.queryString)
    const video = useSelector(state => state.search.video)
    const [searchValue, setSearchValue] = useState(queryString)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewResult, setViewResult] = useState('grid')
    return (<>
            <Header/>
            <div className="search-wrapper">
                <div className='search-line'>
                    <h1 className='search-line__title'>Поиск видео</h1>
                    <div className='search-line__input'>
                        <Search
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='search__input'
                            placeholder="Что хотите посмотреть?"
                            enterButton="Найти"
                            size="large"
                            suffix={<Suffix isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>}
                            onSearch={() => {
                                dispatch(search(searchValue))
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
                        <List
                            className={`search-icon__item ${viewResult === 'list' ? 'active' : 'not-active'}`}
                            onClick={() => setViewResult('list')}
                        />
                        <Grid
                            className={`search-icon__item ${viewResult === 'grid' ? 'active' : 'not-active'}`}
                            onClick={() => setViewResult('grid')}
                        />
                    </div>
                </div>

                <div className={`search-result ${viewResult}`}>
                    {video.map((item) =>
                        <div className={`search-result__item ${viewResult}`}>
                            <img className={`search-result__img ${viewResult}`} src={item.url}/>
                            <div className='hello-hello'>
                                <h1 className='search-result__title'>{item.title}</h1>
                                <div className={`search-result__info ${viewResult}`}>
                                    <div className='search-result__channel'>{item.channelTitle}</div>
                                    <div
                                        className='search-result__view'>{`${Math.trunc(item.viewCount / 1000).toLocaleString('ru')} тыс. просмотров`}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ModalWindow
                title='Сохранить запрос'
                isQueryChange={false}
                isModalVisible={isModalVisible}
                handleOkButton = {() => setIsModalVisible(false)}
                setIsModalVisible={setIsModalVisible}
                handleCancelButton={() => setIsModalVisible(false)}
                maskStyle={{backgroundColor: 'rgba(117, 199, 255, 0.8'}}
                queryString={queryString}
            />
        </>
    )
}
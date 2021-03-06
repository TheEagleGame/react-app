import {Header} from "./Header";
import React, {useEffect, useState} from "react";
import "../style/SearchPage.css";
import {search} from "../store-redux/search/actions";
import {Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loadVideo} from "../store-redux/search/api";
import {ReactComponent as Grid} from "./../assets/grid.svg"
import {ReactComponent as List} from "./../assets/list.svg"
import {Suffix} from "./Suffix";
import {ModalWindow} from "./ModalWindow";
import {addFavoriteQuery} from "../store-redux/favorite-queries/api";


const {Search} = Input

export const SearchPage = () => {
    const query = useSelector(state => state.search.query)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadVideo({
            queryString: query.queryString,
            queryResultCount: query.queryResultCount,
            querySort: query.querySort
        }))
    }, [dispatch])
    const video = useSelector(state => state.search.video)
    const [searchValue, setSearchValue] = useState(query.queryString)
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
                                dispatch(search(
                                    {
                                        queryString: searchValue,
                                        queryResultCount: '12',
                                        querySort: 'relevance'
                                    }
                                ))
                                dispatch(loadVideo(
                                    {
                                        queryString: searchValue,
                                        queryResultCount: '12',
                                        querySort: 'relevance'
                                    }
                                ))
                            }}
                        />
                    </div>
                </div>

                <div className="search-query">
                    <div>
                        Видео по запросу <span className="search-query__text">"{query.queryString}"</span>
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
                        <div className={`search-result__item ${viewResult}`} key={item.id}>
                            <img className={`search-result__img ${viewResult}`} src={item.url} alt='result_img'/>
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
            {isModalVisible &&
            <ModalWindow
                title='Сохранить запрос'
                isQueryChange={false}
                okText='Сохранять'
                cancelText='Не сохранять'
                isModalVisible={isModalVisible}
                handleOkButton={(values) => {
                    dispatch(addFavoriteQuery(values.query, values.name, values.count, values.sort))
                    setIsModalVisible(false)
                }}
                setIsModalVisible={setIsModalVisible}
                handleCancelButton={() => setIsModalVisible(false)}
                maskStyle={{backgroundColor: 'rgba(117, 199, 255, 0.8'}}
                queryString={query.queryString}
            />
            }
        </>
    )
}
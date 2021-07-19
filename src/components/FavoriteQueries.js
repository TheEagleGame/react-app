import React, {useState} from "react";
import {Header} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import './../style/FavoriteQueries.css'
import {Button, Collapse} from 'antd';
import {changeFavoriteQuery, deleteFavoriteQuery} from "../store-redux/auth/actions";
import {updateFavoriteQuery} from "../store-redux/favorite-queries/api";
import {ModalWindow} from "./ModalWindow";
import {search} from "../store-redux/search/actions";
import {useHistory} from "react-router-dom";

const {Panel} = Collapse;

export const FavoriteQueries = () => {
    const favoriteQueries = useSelector(state => state.auth.loggedUser.favoriteQueries)
    const query = useSelector( state => state.search.query)
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [queryActive, setQueryActive] = useState({})
    const dispatch = useDispatch()
    return (
        <div className='cabinet'>
            <Header/>
            <div className='favorite-queries'>
                <h1 className='favorite-queries__title'>Избранное</h1>
                <div className='queries-container'>
                    <Collapse className='query' ghost accordion defaultActiveKey={''}>
                        {favoriteQueries.map(query =>
                            <Panel header={query.queryName} showArrow={false} key={query.id}>
                                <div className='query-active'>
                                    <Button className='query-active__button'
                                            type="primary"
                                            onClick={() => {
                                                dispatch(search(
                                                    {
                                                        queryString: query.queryString,
                                                        queryResultCount: query.queryResultCount,
                                                        querySort: query.querySort
                                                    }
                                                ))
                                                history.replace('/home/search')
                                            }}
                                    >Выполнить</Button>
                                    <div className='query-active__text'>
                                        <div className='query-active__change'
                                             onClick={() => {
                                                 setQueryActive({
                                                     string: query.queryString,
                                                     name: query.queryName,
                                                     count: query.queryResultCount,
                                                     sort: query.querySort,
                                                     id: query.id
                                                 })
                                                 setIsModalVisible(true)
                                             }}
                                        >Изменить
                                        </div>
                                        <div className='query-active__delete'
                                             onClick={() => {
                                                 dispatch(deleteFavoriteQuery(query.id))
                                                 dispatch(updateFavoriteQuery())
                                             }}
                                        >Удалить
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                        )}
                    </Collapse>
                </div>
            </div>
            {
                isModalVisible &&
                <ModalWindow
                    title='Изменить запрос'
                    okText='Изменить'
                    cancelText='Не изменять'
                    currentValue={{
                        name: queryActive.name,
                        count: queryActive.count,
                        query: queryActive.string,
                        sort: queryActive.sort,
                        id: queryActive.id
                    }}
                    isQueryChange={true}
                    isModalVisible={isModalVisible}
                    handleOkButton={ (values) => {
                        dispatch(changeFavoriteQuery(values.query, values.name, values.count, values.id, values.sort))
                        dispatch(updateFavoriteQuery())
                        setIsModalVisible(false)
                    }}
                    setIsModalVisible={setIsModalVisible}
                    handleCancelButton={() => setIsModalVisible(false)}
                    maskStyle={{backgroundColor: 'rgba(117, 199, 255, 0.8'}}
                />
            }
        </div>
    )
}


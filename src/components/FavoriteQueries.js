import React, {useState} from "react";
import {Header} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import './../style/FavoriteQueries.css'
import {Button, Collapse} from 'antd';
import {changeFavoriteQuery, deleteFavoriteQuery} from "../store-redux/auth/actions";
import {updateFavoriteQuery} from "../store-redux/favorite-queries/api";
import {ModalWindow} from "./ModalWindow";

const {Panel} = Collapse;

export const FavoriteQueries = () => {
    const favoriteQueries = useSelector(state => state.auth.loggedUser.favoriteQueries)
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
                                    <Button className='query-active__button' type="primary">Выполнить</Button>
                                    <div className='query-active__text'>
                                        <div className='query-active__change'
                                             onClick={() => {
                                                 setQueryActive({
                                                     string: query.queryString,
                                                     name: query.queryName,
                                                     count: query.queryResultCount,
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
                        id: queryActive.id
                    }}
                    isQueryChange={true}
                    isModalVisible={isModalVisible}
                    handleOkButton={ (values) => {
                        dispatch(changeFavoriteQuery(values.query, values.name, values.count, values.id))
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


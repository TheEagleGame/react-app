import React, {useState} from "react";
import {Header} from "./Header";
import {useSelector} from "react-redux";
import './../style/FavoriteQueries.css'
import {Button, Collapse} from 'antd';

const {Panel} = Collapse;

export const FavoriteQueries = () => {
    const favoriteQueries = useSelector(state => state.auth.loggedUser.favoriteQueries)
    const [activeQueryId, setActiveQueryId] = useState(null)
    return (
        <div className='cabinet'>
            <Header/>
            <div className='favorite-queries'>
                <h1 className='favorite-queries__title'>Избранное</h1>
                <div className='queries-container'>
                    {favoriteQueries.map(query =>
                        <Collapse className='query' ghost>
                            <Panel header={query.queryName} showArrow={false}>
                                <div className='query-active'>
                                    <Button className='query-active__button' type="primary">Выполнить</Button>
                                    <div className='query-active__text'>
                                        <div className='query-active__change'>Изменить</div>
                                        <div className='query-active__delete'>Удалить</div>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    )}
                </div>
            </div>
        </div>
    )
}


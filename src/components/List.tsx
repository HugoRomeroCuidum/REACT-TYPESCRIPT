import React from 'react';
import { Sub } from './types';
import '../index.css';

interface ListProps {
    subs: Sub[];
    onDeleteSub: (index: number) => void;
}

const List: React.FC<ListProps> = ({ subs, onDeleteSub }) => {
    return (
        <ul>
            {subs.map((sub, index) => (
                <li key={sub.nick}>
                    <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                    <h4>
                        {sub.nick} (<small>{sub.subMonths}</small>)
                    </h4>
                    <p>{sub.description?.substring(0, 100)}</p>
                    <button onClick={() => onDeleteSub(index)}>X</button>
                </li>
            ))}
        </ul>
    );
};

export default List;

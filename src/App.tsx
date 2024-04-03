import  { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { Sub, SubsResponseFromApi } from './components/types';
import jsonData from './a.json';

interface AppState {
    subs: Sub[];
    newSubsNumber: number;
}

function App() {
    const [subs, setSubs] = useState<AppState["subs"]>([]);
    const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSubs = (): Promise<SubsResponseFromApi> => {
            return Promise.resolve(jsonData);
        };

        const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
            return apiResponse.map(subFromApi => {
                const {
                    months: subMonths,
                    profileUrl: avatar,
                    nick,
                    description,
                    gender
                } = subFromApi;

                return {
                    nick,
                    description,
                    avatar,
                    subMonths,
                    gender
                };
            });
        };

        fetchSubs().then(apiSubs => {
            const subs = mapFromApiToSubs(apiSubs);
            setSubs(subs);
        });
    }, []);

    useEffect(() => {
        setNewSubsNumber(subs.length);
    }, [subs]);

    const handleNewSub = (newSub: Sub): void => {
        setSubs([...subs, newSub]);
        setNewSubsNumber(n => n + 1);
    };

    const handleDeleteSub = (index: number): void => {
        const updatedSubs = subs.filter((_, idx) => idx !== index);
        setSubs(updatedSubs);
        setNewSubsNumber(newSubsNumber - 1);
    };

    return (
        <div className="App" ref={divRef}>
            <h1>midu subs</h1>
            <div className="counter">{newSubsNumber} subs</div>
            <List subs={subs} onDeleteSub={handleDeleteSub} />
            <Form onNewSub={handleNewSub} />
        </div>
    );
}

export default App;

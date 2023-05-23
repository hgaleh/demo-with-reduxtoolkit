import './App.css';
import { RootState, useAppDispatch } from './state/store';
import { Alphabet } from './alphabet/Alphabet';
import {  useSelector } from 'react-redux';
import { AlphabetType, selectOrDeselect } from './state/slice/root/rootSlice';
import { ChangeEvent, useCallback, useMemo } from 'react';


function App() {
  const alphabetList = useSelector<RootState>(state => state.root) as AlphabetType[];

  const dispatch = useAppDispatch();

  const changedASelection = useMemo(() => [0, 1, 2, 3, 4, 5, 6].map(index => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(selectOrDeselect({
        index,
        isActive: e.target.checked
      }));
    }
  }), [dispatch, selectOrDeselect]);

  return (
    <div>
      <header>
        {[0, 1, 2, 3, 4, 5, 6].map(index => {
          return <div key={index} className="select">
            <label htmlFor={`select${index}`}>{`Select ${index}`}</label>
            <input id={`select${index}`} onChange={changedASelection[index]} type="checkbox"></input>
          </div>
        })}
      </header>
      <main>
        {alphabetList.filter(alpha => alpha).map((alpha) => {
          return <Alphabet key={alpha?.index} data={alpha}/>
        })}
      </main>
    </div>
  );
}

export default App;

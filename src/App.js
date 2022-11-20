import './App.css';
import React, {useState} from 'react';

function App() {
  //assinged is unused
  const [list, setlist] = useState([
 {"id": 0, "name": "mike", "assigned": 0},
 {"id": 1, "name": "Bob", "assigned": 0},
 {"id": 2, "name": "Jerry", "assigned": 0},
 {"id": 3, "name": "Tom", "assigned": 0},
  ])

  const [resultsString, setResultsString] = useState([
    ]
  )

  const [tempName, fetchTempName] = useState("");


  const appendToList = () =>
  {
    let nextIndex = list.length + 1;
    setlist([...list, {"id":nextIndex, "name":tempName, "assigned":0}]);
  }

  const removeFromList = (id) =>
  {
    let newList = list.filter(person => person.id !== id);
    for (let i = 0; i < newList.length; i++)
    { 
      newList[i].id = i;
    }
    setlist(newList);
  }

  const boxUpdate = () =>
  {
    list.sort()
  }

  const generateList = () =>
  {
    setResultsString(resultsString => [""]);
    let bigRef = list;
    console.log(bigRef);
    let tempList = bigRef;

    for (let i = 0; i < list.length; i++)
    {
      let filteredTemp = tempList.filter(person => person.name !== list[i].name); //remove the person getting assigned
      for (let j = 0; j < filteredTemp.length; j++)
        {
          filteredTemp[j].id = j;
        }
      
      let target = Math.floor(Math.random()*filteredTemp.length);
      console.log("index number:" + i + " Target:" + target);
      console.log(filteredTemp);
      if (filteredTemp.length == 0)
      {
        generateList();   //recursion to try again when theres a scenario where at the end of the list. everyone is assigned except where the target is not assigned and subject is the same person
        break;
      }
      setResultsString(resultsString => [...resultsString, list[i].name + " --> " + filteredTemp[target].name]);
  
      tempList = tempList.filter(person => person.name !== filteredTemp[target].name);
      
    }
  }

  const debugList = () =>
  {
    console.log(list);
  }

  return (
    <div className="App">
      <button onClick={debugList}>Debug</button>
      <h1>Secret Santa Generator</h1>
      <div>name</div>
      <input
        onChange={(e) => fetchTempName(e.target.value)}
      ></input>
      <br></br>
      <button style={{marginBottom:30}} onClick={appendToList}>append</button>

      <br></br>

      {list && list
        .map((person, index) => {
          return(
            <React.Fragment>
              <div className='box'>
                <div>{person.name} is index {index}
                  <button onClick={() => removeFromList(person.id)}>Remove</button>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }

      {resultsString && resultsString
        .map((resultsString) => {
          return(
            <React.Fragment>
              <div>
                {resultsString}
              </div>
            </React.Fragment>
          )
        }) 
      }

      <button onClick={generateList}>Gen</button>


    </div>

  );
}

export default App;

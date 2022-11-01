import logo from './logo.svg';
import './App.css';
import PostForm from './components/PostForm';
import AllPost from './components/AllPost';
import { createStore } from "redux";
import axios from 'axios'
import { useState } from 'react';
const reducer = function(state,action){
  if (action.type === 'INC'){
    console.log('incrementando')
    return state + action.payload
  }else if(action.type ==="DESC"){
    console.log("desincrementando")
    return state - action.payload
  }else if(action.type === "API"){
    console.log('valor da moeda', action.valor)
    return state + action.valor
  }
  return state
}

const store = createStore(reducer,3);

store.subscribe(function(){
  console.log("o estado mudou",store.getState())
})

store.dispatch({type: 'INC',payload: 3});


function App() {
  const [valor,setValor] = useState({})
  function PegarValor(){
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-EUR,BRL-EUR')
    .then((res)=>{
      console.log(res.data)
      setValor(res.data.BRLEUR.high)
      store.dispatch({type: 'API',valor: res.data.BRLEUR.high})
    })
  }
  return (
    <div className="App">
    <h1>Hello React!</h1>
    <button onClick={()=> PegarValor()}>Pegar dados</button>
    <button onClick={()=> console.log(valor)}>exibir dados</button>
    <PostForm/>
    <AllPost/>
  </div>
  );
}

export default App;

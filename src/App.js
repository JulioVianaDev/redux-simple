
import './App.css';
import { createStore } from "redux";
import axios from 'axios'
import { useState } from 'react';

//criando o reducer para receber os dados quando for disparado o dispatch 
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
//criando uma store usando o reducer e com um valor inicial 3
const store = createStore(reducer,3);

//quando o valor for mudado vai chamar esse método com o subscribe
store.subscribe(function(){
  console.log("o estado mudou",store.getState())
})
//dispara as mudanças para o reducer que vai enviar para a store
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
  </div>
  );
}

export default App;

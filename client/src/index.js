import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StudentInfo from "./students/StudentInfo";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        student: new StudentInfo(),
    }}>
        <App />

    </Context.Provider>,

)

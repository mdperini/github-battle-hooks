import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import { FaPlus, FaMinus} from 'react-icons/fa';

const Popular = React.lazy(()=> import('./components/Popular'))
const Battle = React.lazy(()=> import('./components/Battle'))
const Results = React.lazy(()=> import('./components/Results'))

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme}) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />

                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    <Route render={()=> <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

function Theme() {
    const [theme, setTheme] = React.useState('light')

    const toDark = () => setTheme('dark')
    const toLight = () => setTheme('light')

    return (
        <div className={theme}>
            {theme === 'light'
            ? <button onClick={toDark} className='avatar'>🔦</button>
            : <button onClick={toLight} className='avatar'>💡</button>}
        </div>
    )
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2,9);
}

function Todo() {
    const [todos, setTodos] = React.useState([])
    const [input, setInput] = React.useState('')

    const handleSubmit = () => {
        setTodos((todos) => todos.concat({
            text: input,
            id: generateId()
        }))

        setInput('')
    }

    const removeToDo = (id) => setTodos((todos) => todos.filter((t) => t.id !== id))

    return (
        <div>
            <input
                type='text'
                className='input-light'
                placeholder='New Todo'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSubmit} >Submit</button>

            <ul>
                {todos.map(({ text, id }) => (
                 <li key={id}>
                     <span>{text}</span>
                     <button onClick={() => removeToDo(id)}>x</button>
                 </li>   
                ))}
            </ul>      
        </div>
    )
}

function CharacterLimit() {
    const [input, setInput] = React.useState('')

    React.useEffect(() => {
        document.title= `${240 - input.length}`
    })

    return (
        <div className="app">
            <textarea
                type="text"
                value={input}
                placeholder='Type'
                onChange={(e) => setInput(e.target.value)}
                 />
                 <button
                    disabled={input.length === 0 || input.length > 240}
                    onClick={() => console.log(input)}>
                    Submit
                 </button>
                 <button
                    disabled={input.length === 0}
                    onClick={() => setInput('')}>
                    Clear
                 </button>
                 <button
                    disabled={input.length > 0}
                    onClick={() => {
                        let str = ''
                        for(var i =0; i < 500; i++) {
                            str = str + i      
                        }
                        
                        setInput(str)
                    }}>
                    Load
                 </button>
        </div>
    )
}

function Wait({ delay = 100, placeholder, ui }) {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        const id = window.setTimeout(() => {
            setShow(true)
        }, delay)
    }, [delay])

    return show === true 
        ? ui
        : placeholder
}

function WaitDelay() {
    return (
        <div className='App'>
            <Wait
                delay={3000}
                placeholder={<p>Waiting...</p>}
                ui={<p>This text should appear after 3 seconds</p>}
                />
        </div>
    )
}
 
ReactDOM.render(
    <App />,
    document.getElementById('app')
)
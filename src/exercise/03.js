// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// Remember: Context lets you wrap any number of nested children
// and allows those children to grab values directly from the parent
const ToggleContext = React.createContext()

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

// helper function which is really a custom hook
// designed to get the context
function useToggle() {
  return React.useContext(ToggleContext)
}

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          {/* The problem is ToggleButton, being nested, doesn't get implicit state using React.cloneElement */}
          {/* The solution is to use React Context API */}
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/

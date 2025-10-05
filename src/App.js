import React from "react"
import AppRoutes from "./Routers/AppRoutes"
import { store } from "./Store"
import { Provider } from "react-redux"

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  )
}

export default App

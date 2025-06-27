// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './Context/Firebase.jsx'
import { UserRoleProvider } from './Context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <UserRoleProvider>
        <App />
      </UserRoleProvider>
    </FirebaseProvider>  
  </StrictMode>,
)

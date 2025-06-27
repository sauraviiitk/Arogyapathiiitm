// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <h1 className='bg-black text-white'>helloytjtu</h1>
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavbarWithSidebar from './components/NavbarWithSidebar'
import AppointmentPage from './components/AppointmentPage'
import HomePage from './components/HomePage'
import BhajansPage from './components/BhajansPage'  
import MantrasPage from './components/MantrasPage'
import HealthTracker from './components/HealthTracker'
import AuthPagePatient from './components/AuthPagePatient'
import YogaPage from './components/YogaPage'
import AccountDetail from './components/AccountDetail'
import Choice from './components/Choice'
import AuthPageDoctor from './components/AuthPageDoctor'
import DoctorUpdateInfo from './components/DoctorUpdateInfo'
import {ToastContainer} from 'react-toastify'
import FindDoctor from './components/FindDoctor'
import PatientAppointmentDetails from './components/PatientAppointmentDetails'
import DoctorPanelAppointment from './components/DoctorPanelAppointment'
import MedicineReminder from './components/MedicineReminder'
import OCRReader from './components/OCRReader'
import ChatApp from './components/ChatApp'
import PatientReports from './components/PatientReports'
import MedicalRecord from './components/MedicalRecord'
import Canva from './components/Canva'
import Home from './depression/pages/Home'
import DepressionTest from './depression/pages/Depressiontest'
import ReliefPage from './depression/pages/ReliefPage'

function App() {
  

  return (
    <>
      <Router>
      <NavbarWithSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-appointment" element={<AppointmentPage />} />
        <Route path="/bhajans" element={<BhajansPage />} />
        <Route path="/mantras" element={<MantrasPage />} />
        <Route path="/health-tracker" element={<HealthTracker />} />
        <Route path="/auth/patient" element={<AuthPagePatient />} />
        <Route path="/auth/doctor" element={<AuthPageDoctor/>}/>
        <Route path="/yoga" element={<YogaPage/>}/>
        <Route path='/account-detail' element={<AccountDetail/>} />
        <Route path='/choice' element={<Choice/>}/>
        <Route path="/update-info" element={<DoctorUpdateInfo/>}/>
        <Route path='/find-doctor' element={<FindDoctor/>} />
        <Route path="/patient-appointments" element={<PatientAppointmentDetails/>}/>
        <Route path="/Doctor-side-appointments" element={<DoctorPanelAppointment/>}/>
        <Route path='/medicinereminder' element={<MedicineReminder/>}/>
        <Route path='/prescriptions' element={<OCRReader/>} />
        <Route path='/chatapp' element={<ChatApp/>}/>
        <Route path='/doctor-patient-reports' element={<PatientReports/>}/>
        <Route path='/medicalRecordOfPatient' element={<MedicalRecord/>}/>
        <Route  path='/canva' element={<Canva/>}/>
        <Route path="/home-Depression" element={<Home/>} />
        <Route
          path="/test"
          element={<DepressionTest/>}
        />
         <Route
          path="/relief-plan"
          element={
            <ReliefPage/>
          }
        />
        {/* other routes... */}
      </Routes>
     <ToastContainer/>
    </Router>
    </>
  )
}

export default App

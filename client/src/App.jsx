import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';


import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';


//Observación, meto todo dentro de auth provider para que todos los componentes puedan acceder a ese contexto
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className=' container mx-auto px-10'>
            <Navbar />
            <Routes>

              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>

            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
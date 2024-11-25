import { Routes, Route } from 'react-router-dom';

import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { UserDetails } from './utils/UserDetails';
import { UserEdit } from './utils/UserEdit';
import { UserDelete } from './utils/UserDelete';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <>
      <main className='App'>
        <UserProvider>
          <Routes>
            <Route path='/' element={ <UserList />} />
            <Route path='/create' element={<UserForm />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/edit/:id' element={<UserEdit />} />
            <Route path="/delete/:id" element={<UserDelete />} />
          </Routes>
        </UserProvider>
      </main>
    </>
  )
};

export default App;
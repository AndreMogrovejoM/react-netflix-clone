import React, {useEffect} from 'react';
import HomeScreen from './conteiners/homeScreen/HomeScreen'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './conteiners/auth/login/Login';
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice"
import { auth } from './backend/firebase';
import Profile from './conteiners/profile/Profile';
import Footer from './components/footer/Footer';

const Nombre = "Andre Mogrovejo Martinez";

function App() {
  const user = useSelector(selectUser);
	// use to manipulate the user state
	const dispatch = useDispatch();

	// listens to users login state (authentication state changes)
	useEffect(() => {
		// pass a clean up function on user Authenticated state listener
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			if (userAuth) {
				// Logged in
				// push the user into the store(dispatch an object into the store)
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					})
				);
			} else {
				// Logged out
				dispatch(logout());
			}
		});

		return unsubscribe;
	}, [dispatch]);

  return (
    <div className="app">

     <Router>
      {!user ? (
         <Login />
       ) : (
        <Switch>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
      )}
     </Router>
	 <Footer nombre={Nombre} />
    </div>
  );
}

export default App;

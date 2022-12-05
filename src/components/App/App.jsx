import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isRegistrated, setIsRegistrated] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [errMessage, setErrMessage] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [checkedShort, setCheckedShort] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState(movies);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getProfileInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies.data);

          localStorage.setItem('savedMovies', JSON.stringify(movies.data));
          setError(false);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  useEffect(() => {
    if (checkedShort && (location.pathname === '/movies')) {
      setMovies(filterShortMovies(movies));
    } else if (!checkedShort && (location.pathname === '/movies')) {
      setMovies(filterShortMoviesBack(movies));
    } else if (checkedShort && (location.pathname === '/saved-movies')) {
      setSavedMovies(filterShortMovies(savedMovies));
    } else if (!checkedShort && (location.pathname === '/saved-movies')) {
      setSavedMovies(filterShortMoviesBack(savedMovies));
    }
  }, [checkedShort, isRequest]);

  function onRegister(name, email, password) {
    return mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsRegistrated(true);
          onLogin(email, password);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrMessage('Пользователь с таким email уже существует');
        } else {
          setErrMessage('Ошибка на сервере');
        }
        setIsRegistrated(false);
      })
  }

  function onLogin(email, password) {
    return mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin();
          history.push('/movies');
        }
      })
      .catch((err) => {
        setErrMessage('Ошибка на сервере');
        setLoggedIn(false);
      })
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setLoggedIn(true);
      history.push(location.pathname);
    }
  }

  function getMovies() {
    setError(false);
    setIsLoading(true);
    const jwt = localStorage.getItem('token');
    return moviesApi.getContent(jwt)
      .then((movies) => {
        setMovies(movies);
        setMovies(filterMovies(movies, search));
      })
      .catch(err => {
        setError(true);
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
        setIsRequest(true);
      })
  }

  function getSavedMovies() {
    setError(false);
    setIsLoading(true);
    return mainApi.getMovies()
      .then((movies) => {
        setSavedMovies(movies.data);
        setSavedMovies(filterMovies(movies.data, search));
      })
      .catch(err => {
        setError(true);
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
        setIsRequest(true);
      })
  }

  const filterMovies = (movies, search) => {
    const filteredMovies = movies.filter((item) => (item.nameEN.toLowerCase().indexOf(search.toLowerCase()) !== -1
      || item.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    return filteredMovies;
  }

  const filterShortMovies = (movies) => {
    setAllMovies(movies);
    const filteredMovies = movies.filter((item) => (item.duration < 40));
    return filteredMovies;
  }

  const filterShortMoviesBack = () => {
    if (allMovies.length === 0) {
      return movies;
    }
    return allMovies;
  }

  function handleSearchInputChange(input) {
    setSearch(input);
  }

  function handleCheckboxChange() {
    setCheckedShort(!checkedShort);
    localStorage.setItem('check', checkedShort);
  }

  function handleSaveMovie(movie) {
    movie.isSaved = true;
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        newMovie.data.isSaved = true;
        setSavedMovies([newMovie.data, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    movie.isSaved = false;
    if (!movie._id) {
      const movies = savedMovies.filter(item => item.nameEN === movie.nameEN);
      movie = movies[0];
    }
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item.nameEN !== movie.nameEN));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser(name, email) {
    mainApi.updateUser(name, email)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} />
      <Switch>

        <ProtectedRoute
          path='/movies'
          loggedIn={loggedIn}
          getMovies={getMovies}
          onChange={handleSearchInputChange}
          movies={movies}
          isLoading={isLoading}
          isRequest={isRequest}
          handleSaveMovie={handleSaveMovie}
          search={search}
          handleCheckboxChange={handleCheckboxChange}
          error={error}
          component={Movies}
          checkedShort={checkedShort}
          onDelete={handleDeleteMovie}
        />

        <ProtectedRoute
          path='/saved-movies'
          loggedIn={loggedIn}
          movies={savedMovies}
          onDelete={handleDeleteMovie}
          handleCheckboxChange={handleCheckboxChange}
          onChange={handleSearchInputChange}
          onSubmit={getSavedMovies}
          component={SavedMovies}
        />

        <ProtectedRoute
          path='/profile'
          loggedIn={loggedIn}
          onSignOut={signOut}
          onUpdate={updateUser}
          component={Profile}
        />

        <Route exact path='/' >
          <Main />
        </Route>

        <Route path="/signup">
          <Register onRegister={onRegister} errMessage={errMessage} />
        </Route>

        <Route path="/signin">
          <Login onLogin={onLogin} errMessage={errMessage} />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

        <Route>
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
              <Redirect to="/signin" />
            )}
        </Route>

      </Switch>
      <Footer />
    </CurrentUserContext.Provider >
  );
}

export default App;

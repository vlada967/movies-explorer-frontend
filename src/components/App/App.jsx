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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [errMessage, setErrMessage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isRequest, setIsRequest] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState(localStorage.getItem('search'));
  const [searchSaved, setSearchSaved] = React.useState('');
  const initialCheckbox = localStorage.getItem('check') === 'true' ? true : false;
  const [beatfilmMovies, setBeatfilmMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(initialCheckbox);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  // console.log('CHECKED', checked)
  const [moviesExist, setMoviesExist] = React.useState(false);
  // const [allMovies, setAllMovies] = React.useState(movies);
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [toShowMovies, setToShowMovies] = React.useState(savedMovies);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
    setSearchSaved('');
    if (!moviesExist && search) {
      // console.log('RE-RENDERED PAGE')

      getMovies();
      setMoviesExist(true);
      // if (checked) {
      //   console.log('GHGHGHGHGH CHECKED')
      //   setMovies(filterShortMovies(movies));
      // }
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setError(false);
      setIsLoading(true);
      Promise.all([mainApi.getProfileInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user.data);
          setSavedMovies(movies.data);
          setToShowMovies(movies.data);
          localStorage.setItem('savedMovies', JSON.stringify(movies.data));
          setError(false);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          setIsRequest(true);
        })
    }
  }, [loggedIn])

  useEffect(() => {
    if (checked && (location.pathname === '/movies')) {
      setMovies(filterShortMovies(movies));
    } else if (!checked && (location.pathname === '/movies')) {
      setMovies(filterShortMoviesBack(movies));
    }
    if (checkedSaved && (location.pathname === '/saved-movies')) {
      setToShowMovies(filterShortMovies(savedMovies));
    } else if (!checkedSaved && (location.pathname === '/saved-movies')) {
      setToShowMovies(filterShortMoviesBack(savedMovies));
    }
  }, [checked, checkedSaved, isRequest]);

  function onRegister(name, email, password) {
    return mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
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
      mainApi.checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          history.push(location.pathname);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    }
  }

  function getMovies() {
    // console.log('FUNCTION GET MOVIES')
    if (beatfilmMovies.length === 0) {
      // console.log('beatfilmMovies.length === 0')
      setError(false);
      setIsLoading(true);
      const jwt = localStorage.getItem('token');
      return moviesApi.getContent(jwt)
        .then((movies) => {
          setBeatfilmMovies(movies);
          if (checked) {
            // console.log('need to filter!', movies)
            setMovies(filterShortMovies(filterMovies(movies, search)));
          } else {
            setMovies(filterMovies(movies, search));
          }

        })
        .catch(err => {
          setError(true);
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
          setIsRequest(true);
        })
    } else {
      // console.log(search)
      // console.log('beatfilm', beatfilmMovies);
      setMovies(filterMovies(beatfilmMovies, search));
      // console.log('SEARCHED AND FILTERED', filterMovies(beatfilmMovies, search))
    }
    // console.log('CHECKED in functon get movies', checked)
    if (checked) {
      // console.log('need to filter!', movies)
      setMovies(filterShortMovies(filterMovies(beatfilmMovies, search)));
    } // else if (!checked) {
    //   console.log('NO need to filter!')
    //   setMovies(filterShortMoviesBack(movies));
    // }
  }

  // useEffect(() => {
  //   setMovies(filterMovies(beatfilmMovies, search));

  // }, [movies, checked, search])

  function handleSubmitSavedMovies() {
    // setError(false);
    // setIsLoading(true);
    // return mainApi.getMovies()
    //   .then((movies) => {
    //     setSavedMovies(movies.data);
    //     // setSavedMovies(filterMovies(movies.data, searchSaved));
    //   })
    //   .catch(err => {
    //     setError(true);
    //     console.log(err)
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //     setIsRequest(true);
    //   })
    // console.log(searchSaved);
    // console.log('savedMovies', savedMovies)
    // console.log('toShowMovies', toShowMovies)
    setToShowMovies(filterMovies(savedMovies, searchSaved));
  }

  const filterMovies = (array, input) => {
    // console.log('going to filter!', array, input)
    // const filteredMovies = movies.filter((item) => (item.nameEN.toLowerCase().indexOf(search.toLowerCase()) !== -1
    //   || item.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    // return filteredMovies;
    // console.log('filtering!', array, input)
    const filteredMovies = array.filter((item) => (item.nameEN.toLowerCase().indexOf(input.toLowerCase()) !== -1
      || item.nameRU.toLowerCase().indexOf(input.toLowerCase()) !== -1));
    // console.log('JUST FILTERED!', filteredMovies)
    return filteredMovies;
  }

  const filterShortMovies = (array) => {
    // console.log('CHECKBOX before', array)
    setAllMovies(array);
    const filteredMovies = array.filter((item) => (item.duration < 40));
    // console.log('CHECKBOX filtered movies', filteredMovies)
    return filteredMovies;
  }

  const filterShortMoviesBack = () => {
    // console.log('ALL MOVIES', allMovies);
    if (location.pathname === '/saved-movies') {
      if (searchSaved) {
        console.log('SEARCH SAVED', searchSaved);
        // setToShowMovies(filterMovies(savedMovies));
        return (filterMovies(savedMovies, searchSaved));
      } else {
        return (savedMovies);
      }
    }
    // else if (allMovies.length === 0) {
    //   console.log('allMovies.length === 0', movies);
    //   return movies;
    // } else {
    //   return allMovies;
    // }
    else if (!search) {
      console.log('there is NO search');
      return beatfilmMovies;
    } else {
      console.log('there is search', search);
      return filterMovies(beatfilmMovies, search);
    }
  }

  function handleSearchInputChange(input) {
    setSearch(input);
    localStorage.setItem('search', input);
  }
  function handleSearchSavedInputChange(input) {
    setSearchSaved(input);
  }

  function handleCheckboxChange() {
    setChecked(!checked);
    localStorage.setItem('check', !checked);
  }

  function handleCheckboxSavedChange() {
    setCheckedSaved(!checkedSaved);
  }

  function handleSaveMovie(movie) {
    movie.isSaved = true;
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        newMovie.data.isSaved = true;
        setSavedMovies([newMovie.data, ...savedMovies]);
        setToShowMovies([newMovie.data, ...savedMovies]);
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
        setToShowMovies(savedMovies.filter(item => item.nameEN !== movie.nameEN));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser(name, email) {
    mainApi.updateUser(name, email)
      .then((user) => {
        setCurrentUser(user.data);
        // console.log(user);
        setMessage('Данные успешно изменены');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    setErrMessage('');
    setSavedMovies([]);
    setMovies([]);
    setAllMovies([]);
    setSearch('');
    setChecked(false);
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
          savedMovies={savedMovies}
          isLoading={isLoading}
          isRequest={isRequest}
          handleSaveMovie={handleSaveMovie}
          search={search}
          handleCheckboxChange={handleCheckboxChange}
          error={error}
          component={Movies}
          checkedShort={checked}
          onDelete={handleDeleteMovie}
        />

        <ProtectedRoute
          path='/saved-movies'
          loggedIn={loggedIn}
          movies={toShowMovies}
          onDelete={handleDeleteMovie}
          handleCheckboxChange={handleCheckboxSavedChange}
          onChange={handleSearchSavedInputChange}
          onSubmit={handleSubmitSavedMovies}
          isLoading={isLoading}
          searchSaved={searchSaved}
          component={SavedMovies}
        />

        <ProtectedRoute
          path='/profile'
          loggedIn={loggedIn}
          onSignOut={signOut}
          onUpdate={updateUser}
          message={message}
          setMessage={setMessage}
          component={Profile}
        />

        <Route exact path='/' >
          <Main />
        </Route>

        <Route path="/signup">
          {loggedIn ? <Redirect to='/movies' /> :
            <Register onRegister={onRegister} errMessage={errMessage} />}
        </Route>

        <Route path="/signin">
          {loggedIn ? <Redirect to='/movies' /> :
            <Login onLogin={onLogin} errMessage={errMessage} />}
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider >
  );
}

export default App;

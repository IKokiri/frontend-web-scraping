import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Authenticate from '../../domain/usecases/authenticate/Authenticate';
import AxiosPostRequest from '../../infrastructure/api/AxiosPostRequest';
import { AuthParams } from '../../types/AuthParams';
import AxiosCreateuser from '../../infrastructure/api/AxiosCreateUser';
import { RegisterParams } from '../../types/RegisterParams';
import imgLogin from './assets/login.jpg';

function Login(): JSX.Element {
  const axiosPostApi = new AxiosPostRequest();
  const authenticate = new Authenticate(axiosPostApi);
  const history = useHistory();

  const auth = async (event: any) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const senha = event.target.elements.password.value;

    const params: AuthParams = {
      email,
      senha,
    };

    const response = await authenticate.auth(params);

    if (response.body === undefined) {
      alert('Tente mais tarde!');
    } else if (response.body.data.status) {
      window.localStorage.setItem(
        'token',
        JSON.stringify(response.body.data.data.token)
      );
      history.push('/admin');
    } else {
      alert(response.body.message);
    }
  };

  const register = async (event: any) => {
    event.preventDefault();
    const email = event.target.elements.registerEmail.value;
    const name = event.target.elements.registerName.value;
    const password = event.target.elements.registerPassword.value;
    const confirmPassword = event.target.elements.registerConfirmPassword.value;
    const checkMathPassword = password === confirmPassword;
    if (!checkMathPassword) {
      alert('Passwords are not the same!');
    } else {
      const registerUserParams: RegisterParams = {
        email,
        nome: name,
        senha: password,
      };
      const axiosCreateuser = new AxiosCreateuser();
      const resultCreateuser = await axiosCreateuser.createUser(
        registerUserParams
      );
      if (resultCreateuser.body) {
        alert(resultCreateuser.body.data.message);
      }
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <img src={imgLogin} alt="img login" style={{ width: '200px' }} />
        </Grid>
        <Grid item xs={10} md={4} sm={10}>
          <h2>Login</h2>
          <form onSubmit={auth}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    id="email"
                    label="E-Mail"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <TextField
                    required
                    type="password"
                    id="password"
                    label="Password"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    style={{ height: '45px' }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Entrar
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    type="submit"
                  >
                    Esqueci Minha Senha!
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={10} md={4} sm={10}>
          <h2>Register</h2>
          <form onSubmit={register}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    id="registerEmail"
                    label="E-Mail"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <TextField
                    required
                    type="text"
                    id="registerName"
                    label="name"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <TextField
                    required
                    type="password"
                    id="registerPassword"
                    label="Password"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <TextField
                    required
                    type="password"
                    id="registerConfirmPassword"
                    label="Confirm Password"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;

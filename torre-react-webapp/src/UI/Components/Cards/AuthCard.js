import { useState, useReducer } from "react";
import requestSome from "../../../Helpers/requests";
import {
  useScreenContext,
  useLoadingContext,
} from "../../../Modules/Screen/ScreenProvider";
import {
  useUserHandlerContext,
} from "../../../Modules/User/UserProvider";
import {
  useSocialContext,
} from "../../../Modules/Social/SocialProvider";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import styles from "./AuthCard.module.scss";

const initialState = {
  authState: 0,
  buttonText: "Continue",
  authMessage: "Do you have a Torre account?",
  inputErrorsMessage: undefined,
  error: false,
  loading: false,
  userInfo: undefined,
  correctMatch: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GO_BEGINING":
      return initialState;
    case "GO_LOGIN":
      return {
        ...state,
        authState: 1,
        authMessage: "Cool, login to start",
        buttonText: "Login",
        loading: false,
        correctMatch: true,
      };
    case "GO_REGISTER":
      return {
        ...state,
        authState: 2,
        authMessage: "You don't have an account yet, please register",
        buttonText: "Register",
        loading: false,
        correctMatch: false,
      };
    case "GO_TORRE":
      return {
        ...state,
        authState: 3,
        authMessage:
          "You don't have a Torre account yet, please register in the link below",
        error: true,
        loading: false,
      };
    case "GO_ERROR":
      return {
        ...state,
        authMessage: action.message,
        error: true,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "VERIFY":
      return {
        ...state,
        inputErrorsMessage: action.message,
        correctMatch: action.value,
      };
    default:
      throw new Error();
  }
};

/**
 * Card component for Register / Login
 */
const AuthCard = () => {
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });
  //const userContext = useUserContext();
  const { login, register } = useUserHandlerContext();
  const { setScreen } = useScreenContext();
  const { setGlobalLoading } = useLoadingContext();
  const { loadClosePeople } = useSocialContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const verifyTorre = async () => {
    try {
      dispatch({ type: "LOADING" });
      const result = await requestSome({
        path: `/auth/val/${userCreds.username}`,
      });
      if (result.code === 200) {
        dispatch({ type: "GO_LOGIN" });
      } else if (result.code === 1001) {
        dispatch({ type: "GO_REGISTER" });
      } else if (result.code === 1000) {
        dispatch({ type: "GO_TORRE" });
      }
    } catch (error) {
      dispatch({ type: "GO_ERROR", message: error.message });
    }
  };

  const loginHandler = async () => {
    try {
      setGlobalLoading(true);
      await login(userCreds.username, userCreds.password);
      await loadClosePeople();
      setScreen(sessionStorage.getItem("JWTtorreJobsToken") ? 1 : 0);
      setGlobalLoading(false);
    } catch (error) {
      setGlobalLoading(false);
      dispatch({ type: "GO_ERROR", message: error.message });
    }
  };

  const registerHandler = async () => {
    try {
      setGlobalLoading(true);
      await register(userCreds.username, userCreds.password);
      await loadClosePeople();
      setScreen(sessionStorage.getItem("JWTtorreJobsToken") ? 1 : 0);
      setGlobalLoading(false);
    } catch (error) {
      setGlobalLoading(false);
      dispatch({ type: "GO_ERROR", message: error.message });
    }
  };

  /**
   * This return the correct method for the Continue action Button
   * It may change it functionality according the Existence of the User
   * in the plataform and in Torre
   * @param {*} e
   */
  const continueButtonHandler = async (e) => {
    e.preventDefault();
    //  Switch
    switch (state.authState) {
      //  In this case there's no Idea who's the user
      case 0:
        await verifyTorre();
        break;
      //  In this case, the user was recognized as plataformn registered
      case 1:
        await loginHandler();
        break;
      //  In this case the user was registered in Torre but not here, so he may create an account
      case 2:
        await registerHandler();
        break;
      //  The user is not regitered in this plataform nor in Torre
      default:
        return;
    }
  };

  /**
   * This returns the current UI configuration for the Auth Card depending on the state of registration
   * of the user
   */
  const cardComponent = () => {
    return (
      <div className={`bg-secondary p-12 color-white ${styles.AuthCard}`}>
        <div className="w-auto flex justify-center flex-col text-center">
          {state.authState > 0 && (
            <span className="w-full flex justify-start mb-10">
              <button
                className="underline"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "GO_BEGINING" });
                }}
              >
                Back
              </button>
            </span>
          )}
          <img
            src="https://torre-media.s3-us-west-2.amazonaws.com/organizations/Torre+(generic)+-+Dark+icon+-+Lime+(x2).png"
            className="object-contain h-28 w-full mb-5"
            alt="Torre co"
          />
          {/* For SEO Purposes :  Title */}
          <h1 className="text-2xl mb-5">Torre Jobs</h1>
          <div className="flex flex-col">
            <p className={`mb-3 ${state.error && "text-red-500"}`}>
              {state.authMessage}
            </p>
            <p className="mb-3 text-red-500">
              {state.inputErrorsMessage && state.inputErrorsMessage}
            </p>
            {/* Username INPUT */}
            <input
              type="text"
              placeholder="username"
              autoComplete="off"
              className={styles.basicInput}
              onChange={(event) => {
                setUserCreds({ ...userCreds, username: event.target.value });
              }}
              disabled={state.authState === 3}
            />

            {/* password INPUT */}
            {(state.authState === 1 || state.authState === 2) && (
              <input
                type="password"
                placeholder="password"
                autoComplete="off"
                className={styles.basicInput}
                onChange={(event) => {
                  setUserCreds({
                    ...userCreds,
                    password: event.target.value,
                  });
                  if (userCreds.password.length < 7) {
                    dispatch({
                      type: "VERIFY",
                      value: false,
                      message: "Password must be longer than 7",
                    });
                  } else {
                    dispatch({
                      type: "VERIFY",
                      value: true,
                      message: undefined,
                    });
                  }
                }}
                required
              />
            )}

            {/* repeat password INPUT */}
            {state.authState === 2 && (
              <input
                type="password"
                placeholder="repeat password"
                autoComplete="off"
                className={styles.basicInput}
                onChange={(event) => {
                  if (event.target.value !== userCreds.password)
                    dispatch({
                      type: "VERIFY",
                      value: false,
                      message: "Passwords not match",
                    });
                  else
                    dispatch({
                      type: "VERIFY",
                      value: true,
                      message: undefined,
                    });
                }}
                required
              />
            )}

            {state.loading ? (
              <LoadingIndicator />
            ) : (
              <button
                className={styles.continueButton}
                onClick={continueButtonHandler}
                disabled={state.authState === 3 || !state.correctMatch}
              >
                {state.buttonText}
              </button>
            )}

            <a
              href="https://www.torre.co/"
              target="_blank"
              className="mt-5 underline "
              rel="noreferrer"
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    );
  };

  return <div>{cardComponent()}</div>;
};

export default AuthCard;

const Login = ({loginHandler}) => {   
    return (
        <div className="d-flex justify-content-center">
            <button className="btn my-button text-white" onClick={loginHandler}>Continue with Spotify</button>
        </div>
    )
};

export default Login;
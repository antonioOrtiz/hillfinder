import 'semantic-ui-css/semantic.min.css'
import LoginForm from '../components/Login/LoginForm.jsx'
import { withRouter } from "react-router-dom";

const Login = ({ ...props}) => (<>
 <LoginForm {...props} />
</>)

export default withRouter(Login)


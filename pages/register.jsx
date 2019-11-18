import 'semantic-ui-css/semantic.min.css'
import RegisterForm from '../components/Register/RegisterForm.jsx'
import '../components/Register/Register.css'
import { withRouter } from "react-router-dom";

const Register = (props) => (<>
 <RegisterForm {...props} />
</>)

export default withRouter(Register)

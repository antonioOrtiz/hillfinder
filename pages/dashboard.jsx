
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser } from '../store/reducers/users/index'
import { withRouter } from "react-router-dom";

let Dashboard;

Dashboard = ({ isLoggedIn, logOutUser }) => (
 <>
 <h1>Dashboard</h1>
 </>
);



function mapStateToProps(state) {
  const { users } = state
  const { isLoggedIn } = users
 return { isLoggedIn }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)
